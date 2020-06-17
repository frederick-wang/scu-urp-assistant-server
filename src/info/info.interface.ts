import { ScuUietp } from './entities/ScuUietp.entity'

export interface ScuUietpInfo extends Partial<ScuUietp> {
  otherMemberNames: string[]
}
