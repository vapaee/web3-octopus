import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Balance, TransferStatus } from '@app/types';
import { TokenBalanceService } from '@app/services/token-balance.service';
import { TokenTransferService } from '@app/services/token-transfer.service';
import { SessionService } from '@app/services/session-kit.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { timer, of, catchError, map, switchMap } from 'rxjs';
import { ExpandableManagerService } from '@app/components/base-components/expandable/expandable-manager.service';
import { SharedModule } from '@app/shared/shared.module';
import { W3oTransferStatus } from '@vapaee/w3o-core';

@Component({
    selector: 'app-token-transfer-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    templateUrl: './token-transfer-form.component.html',
    styleUrls: ['./token-transfer-form.component.scss']
})
export class TokenTransferFormComponent implements OnInit, OnDestroy {
    @Input() tokenSymbol!: string;

    balance!: Balance | null;
    form!: FormGroup;
    isLoading = false;
    private destroy$ = new Subject<void>();
    transferStatus: W3oTransferStatus = { state: 'none' };

    constructor(
        private fb: FormBuilder,
        private tokenBalanceService: TokenBalanceService,
        private tokenTransferService: TokenTransferService,
        private sessionService: SessionService,
        private expandableManager: ExpandableManagerService
    ) {}

    ngOnInit(): void {
        // Subscribe to transfer status from the service
        this.tokenTransferService.getTransferStatus$(this.tokenSymbol)
            .pipe(takeUntil(this.destroy$))
            .subscribe(status => {
                this.transferStatus = status;
            });

        // Initialize Form
        this.form = this.fb.group({
            recipient: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[a-z1-5]{1,12}$/),
                    this.selfTransferValidator()
                ],
                [this.accountValidator()]
            ],
            amount: [
                null,
                [Validators.required, this.amountValidator()]
            ]
        });

        // Subscribe to token balances
        this.tokenBalanceService.getAllBalances()
            .pipe(
                takeUntil(this.destroy$),
                map(balances => balances.find(b => b.token.symbol === this.tokenSymbol)),
                distinctUntilChanged()
            )
            .subscribe(balance => {
                this.balance = balance || null;
                if (this.balance) {
                    this.form.get('amount')?.updateValueAndValidity();
                }
            });

        // Handle decimal precision changes
        this.form.get('amount')?.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        ).subscribe(value => {
            this.enforceDecimalPrecision(value);
        });

        // Subscribe to expandable state changes to reset form when expandable is closed
        this.expandableManager.state$
            .pipe(
                takeUntil(this.destroy$),
                map(state => state[`expandable-${this.tokenSymbol}`]),
                distinctUntilChanged()
            )
            .subscribe(isOpen => {
                if (isOpen === false) {
                    setTimeout(() => {
                        this.resetForm();
                    }, 500);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // ================================================
    // Recipient Methods

    selfTransferValidator() {
        return (control: any) => {
            const sessionActor = this.sessionService.current?.address;
            if (control.value === sessionActor) {
                return { selfTransfer: true };
            }
            return null;
        };
    }

    accountValidator() {
        return (control: AbstractControl) => {
            if (!control.value) {
                return of(null);
            }
            return timer(300).pipe(
                switchMap(() => this.sessionService.validateAccount(control.value)),
                map(exists => exists ? null : { accountNotFound: true }),
                catchError(() => of({ accountNotFound: true }))
            );
        };
    }

    // ===============================================
    // Amount Methods

    amountValidator() {
        return (control: any) => {
            if (!this.balance || !this.balance.token) return { invalidAmount: true };

            const amount = parseFloat(control.value);
            if (isNaN(amount) || amount <= 0) return { invalidAmount: true };

            const precisionFactor = Math.pow(10, this.balance.token.precision);
            const balance = this.balance.amount.value;

            if (amount * precisionFactor > balance) {
                return { outOfBalance: true };
            }

            return null;
        };
    }

    private enforceDecimalPrecision(value: any): void {
        if (value === null || value === undefined || !this.balance) return;

        const precision = this.balance.token.precision;

        let stringValue = value.toString();

        if (stringValue.includes('.')) {
            let [integerPart, decimalPart] = stringValue.split('.');

            if (decimalPart.length > precision) {
                decimalPart = decimalPart.slice(0, precision);
            }

            stringValue = `${integerPart}.${decimalPart}`;
        }

        this.form.get('amount')?.setValue(stringValue, { emitEvent: false });
    }

    useMax(): void {
        if (!this.balance) return;
        const maxAmount = this.balance.amount.formatted;
        this.form.get('amount')?.setValue(maxAmount);
    }

    isMaxAmount(): boolean {
        return this.balance ? this.form.get('amount')?.value === this.balance.amount.formatted : false;
    }

    // ================================================
    // Transfer Methods

    async transfer(): Promise<void> {
        if (this.form.invalid) return;

        const { recipient, amount } = this.form.value;

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            return;
        }

        if (!this.balance) {
            return;
        }

        const formattedAmount = `${numericAmount.toFixed(this.balance.token.precision)} ${this.balance.token.symbol}`;
        const sender = this.sessionService.current?.address;

        if (!sender) {
            return;
        }

        const token = this.balance.token;
        const memo = `Transfer of ${formattedAmount}`;

        try {
            this.isLoading = true;
            await this.tokenTransferService.transferToken(
                recipient,
                formattedAmount,
                token,
                memo,
            );
        } catch (error) {
            console.error('Transfer failed:', error);
        } finally {
            this.isLoading = false;
        }
    }

    retry(): void {
        this.tokenTransferService.resetTransferCycle(this.tokenSymbol);
    }

    // Updated close function: only instruct the expandable manager to close the expandable
    close(): void {
        this.expandableManager.close(`expandable-${this.tokenSymbol}`);
    }

    resetForm() {
        this.tokenTransferService.resetTransferCycle(this.tokenSymbol);
        this.form.reset();
    }
}
