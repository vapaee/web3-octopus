
import {
    AntelopeTokensService
} from "@vapaee/w3o-antelope";

export interface VortDEXw3oServices {
    tokens: AntelopeTokensService;
    snapshot: () => any;
}
