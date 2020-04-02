import { Test, TestingModule } from '@nestjs/testing'
import { InfoController } from './info.controller'
import { InfoService } from './info.service'

describe('Info Controller', () => {
  let controller: InfoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [InfoService]
    }).compile()

    controller = module.get<InfoController>(InfoController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World')
    })
  })
})
