import { ScuUietp } from './info.entity'

export const formatScuUietp = (data: ScuUietp[]) => {
  return data
    .map(
      ({
        projectYear,
        collegeName,
        projectName,
        projectLeaderName,
        participantNumber,
        otherMemberInformation,
        schoolSupervisorName,
        projectLevel,
        applicationCategory,
        projectCategory
      }) => ({
        projectYear,
        collegeName,
        projectName,
        projectLeaderName,
        participantNumber,
        otherMembersName: otherMemberInformation
          ? otherMemberInformation.split(',').map(s => s.split('/')[0])
          : [],
        schoolSupervisorName,
        projectLevel,
        applicationCategory,
        projectCategory
      })
    )
    .sort((a, b) => b.projectYear - a.projectYear)
}
