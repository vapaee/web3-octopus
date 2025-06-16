
import {
    AntelopeTokensService,
    AntelopeResourcesService
} from "@vapaee/w3o-antelope";

export interface VortDEXw3oServices {
    tokens: AntelopeTokensService;
    resources: AntelopeResourcesService;
    snapshot: () => any;
}
