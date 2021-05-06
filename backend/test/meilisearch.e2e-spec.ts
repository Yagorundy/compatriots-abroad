import { INestApplication } from '@nestjs/common'
import { Config } from 'meilisearch'
import * as request from 'supertest'
import { getAppFake } from '../src/app.fake'

describe('Meilisearch (e2e)', () => {
    let app: INestApplication

    beforeAll(async () => {
        app = await getAppFake()
        await app.init()
    })
    afterAll(async () => {
        await app.close()
    })

    it(`/meilisearch/config (GET)`, () => {
        return request(app.getHttpServer())
            .get('/meilisearch/config')
            .expect(200)
            .expect(res => {
                const body = res.body as Config
                expect(body).toHaveProperty('host' as keyof Config)
                expect(typeof body.host).toBe(typeof '')
                expect(body).toHaveProperty('apiKey' as keyof Config)
                expect(typeof body.apiKey).toBe(typeof '')
            })
    })
})
