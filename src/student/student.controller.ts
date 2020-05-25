import { Controller, Get, UseGuards } from '@nestjs/common'
import { StudentService } from './student.service'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRoleType } from 'src/user/user.interface'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from 'src/core/guards/roles.guard'

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('training_scheme')
  @Roles(UserRoleType.ADMIN, UserRoleType.NORMAL_USER)
  @UseGuards(AuthGuard(), RolesGuard)
  getAllTraningSchemes() {
    return this.studentService.findAllTrainingSchemes()
  }
}
