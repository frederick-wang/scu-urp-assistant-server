import { ScuUietp } from './info.entity'
import { map, compose, descend, prop, sort } from 'ramda'
import { ScuUietpInfo } from './info.interface'

export const formatScuUietp = (data: ScuUietp[]): ScuUietpInfo[] => {
  const convertMemberInformationToNames = ({
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
  }: ScuUietp): ScuUietpInfo => ({
    projectYear,
    collegeName,
    projectName,
    projectLeaderName,
    participantNumber,
    otherMemberNames: otherMemberInformation
      ? otherMemberInformation.split(',').map((s: string) => s.split('/')[0])
      : [],
    schoolSupervisorName,
    projectLevel,
    applicationCategory,
    projectCategory
  })
  const projectYearSort = sort(descend(prop('projectYear')))
  type sortType = (list: ScuUietpInfo[]) => ScuUietpInfo[]
  const format = compose(
    projectYearSort as sortType,
    map(convertMemberInformationToNames)
  )
  return format(data)
}
