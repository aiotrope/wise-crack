import React from 'react'
import { Container, Box, Heading, Text } from '@chakra-ui/react'

import courseInfoService from './services/courseInfo'

type CoursePartBase = {
  name: string
  exerciseCount: number
  type: string
}

type CourseProjectPart = {
  groupProjectCount: number
}

type CourseSubmissionPart = {
  description: string
  exerciseSubmissionLink: string
}

type CourseRequirementPart = {
  requirements: string[]
}

type CoursePart = CoursePartBase &
  CourseProjectPart &
  CourseSubmissionPart &
  CourseRequirementPart

interface PropsHeader {
  name: string
}

interface PropsTotal {
  courseParts: CoursePart[]
}

const Header = ({ name }: PropsHeader) => (
  <Box mb={25}>
    <Heading as="h1" size="lg" noOfLines={1}>
      {name}
    </Heading>
  </Box>
)

const Content = ({
  name,
  exerciseCount,
  description,
  exerciseSubmissionLink,
  groupProjectCount,
  requirements,
}: CoursePart) => {
  return (
    <Box mb={5}>
      <Heading as="h2" size="md" noOfLines={1}>
        {name} {exerciseCount}
      </Heading>
      <Text as="i">{description}</Text>
      {exerciseSubmissionLink && (
        <Text>submit to {exerciseSubmissionLink}</Text>
      )}
      {groupProjectCount && <Text>project exercises {groupProjectCount}</Text>}
      {requirements && <Text>required skills: {requirements.join(', ')}</Text>}
    </Box>
  )
}

const Total = ({ courseParts }: PropsTotal) => (
  <>
    <Heading as="h3" size="sm">
      Number of exercises{' '}
      {courseParts?.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </Heading>
  </>
)

export const App: React.FC = () => {
  const [courseParts, setCourseParts] = React.useState<CoursePart[]>([])
  const courseName = 'Half Stack application development'
  const isComponentMounted = React.useRef(true)

  React.useEffect(() => {
    isComponentMounted.current = false
  }, [])

  React.useEffect(() => {
    const fetchCourses = async () => {
      if (isComponentMounted) {
        const courseInfo = await courseInfoService.getAll()
        setCourseParts(courseParts.concat(courseInfo))
        return courseInfo
      }
    }
    fetchCourses()
  }, [])
  return (
    <Container maxW="container.sm" mt={100}>
      <Box>
        <Header name={courseName} />

        {courseParts?.map(
          (
            {
              name,
              type,
              exerciseCount,
              description,
              exerciseSubmissionLink,
              groupProjectCount,
              requirements,
            },
            index
          ) => (
            <Box key={index}>
              <Content
                name={name}
                type={type}
                exerciseCount={exerciseCount}
                description={description}
                exerciseSubmissionLink={exerciseSubmissionLink}
                groupProjectCount={groupProjectCount}
                requirements={requirements}
              />
            </Box>
          )
        )}
        <Box>
          <Total courseParts={courseParts} />
        </Box>
      </Box>
    </Container>
  )
}
