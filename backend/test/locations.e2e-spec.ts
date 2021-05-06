import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { IGetCountryByCoordinatesDto } from '../../common/transfer/coordinates/get-country-by-coordinates-dto.interface'
import { getAppFake } from '../src/app.fake'
import { CoordinatesDto } from '../src/core/locations/coordinates.dto'
import { GetCoordinatesDto } from '../src/core/locations/get-coordinates-query.dto'

describe('Locations (e2e)', () => {
    let app: INestApplication

    beforeAll(async () => {
        app = await getAppFake()
        await app.init()
    })
    afterAll(async () => {
        await app.close()
    })

    it(`/coordinates (GET)`, () => {
        return request(app.getHttpServer())
            .get('/coordinates')
            .query({ target: 'users', countryOfOrigin: 'BG' } as GetCoordinatesDto)
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBe(true)
            })
    })
    it(`/coordinates (GET) Bad Request (empty query)`, () => {
        return request(app.getHttpServer())
            .get('/coordinates')
            .expect(400)
    })
    it(`/coordinates (GET) Bad Request (partial query)`, () => {
        return request(app.getHttpServer())
            .get('/coordinates')
            .query({ countryOfOrigin: 'bg' } as Partial<GetCoordinatesDto>)
            .expect(400)
    })
    it(`/coordinates (GET) Bad Request (invalid query)`, () => {
        return request(app.getHttpServer())
            .get('/coordinates')
            .query({ ['target' as keyof GetCoordinatesDto]: 'asd' })
            .expect(400)
    })

    it(`/country (GET)`, () => {
        return request(app.getHttpServer())
            .get('/country')
            .query({ lat: '70', lng: 90 } as CoordinatesDto & { lat: string })
            .expect(200)
            .expect(res => {
                const body = res.body as IGetCountryByCoordinatesDto
                expect(body).toHaveProperty('code' as keyof IGetCountryByCoordinatesDto)
                expect(typeof body.code).toBe(typeof '')
                expect(body.code).toEqual(body.code.toUpperCase())
            })
    })
    it(`/country (GET) Bad Request (empty query)`, () => {
        return request(app.getHttpServer())
            .get('/country')
            .expect(400)
    })
    it(`/country (GET) Bad Request (partial query)`, () => {
        return request(app.getHttpServer())
            .get('/country')
            .query({ lat: 1 } as Partial<CoordinatesDto>)
            .expect(400)
    })
    it(`/country (GET) Bad Request (invalid query)`, () => {
        return request(app.getHttpServer())
            .get('/country')
            .query({ ['lat' as keyof CoordinatesDto]: 'asd' })
            .expect(400)
    })
})
