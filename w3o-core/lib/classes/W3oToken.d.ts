import { W3oContract } from '.';
export declare abstract class W3oToken {
    abstract isSystemToken(): boolean;
    abstract getIconUrl(): string;
    abstract getDisplayName(): string;
    abstract getSymbol(): string;
    abstract getDecimals(): number;
    abstract getUSDPrice(): number;
    abstract getContract(): W3oContract;
    abstract snapshot(): any;
}
