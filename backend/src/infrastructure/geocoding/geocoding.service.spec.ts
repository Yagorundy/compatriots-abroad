import { GeocodingConfigService } from "../../config/geocoding/geocoding-config.service";
import { IGeocodingService } from "./geocoding.service.contract";
import { GeocodingServiceFake } from "./geocoding.service.fake";

describe(GeocodingConfigService.name, () => {
    let service: IGeocodingService

    beforeEach(() => {
        service = new GeocodingServiceFake();
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
