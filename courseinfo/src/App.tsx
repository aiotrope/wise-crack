import React from 'react'
import { Container, Box, Heading, Text } from '@chakra-ui/react'

import courseInfoService from './services/courseInfo'

/* interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal'
  description: string
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission'
  description: string
  exerciseSubmissionLink: string
} */

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface PropsHeader {
  name: string
}

const Header = ({ name }: PropsHeader) => (
  <Box>
    <Heading as="h1">{name}</Heading>
  </Box>
)

const Content = ({ name, type, exerciseCount }: CoursePartBase) => (
  <>
    <Heading>{name}</Heading>
    <Text>{type}</Text>
    <Text>{exerciseCount}</Text>
  </>
)

export const App: React.FC = () => {
  const [courses, setCourses] = React.useState([])
  const courseName = 'Half Stack application development'
  const isComponentMounted = React.useRef(true)

  React.useEffect(() => {
    isComponentMounted.current = false
  }, [])

  React.useEffect(() => {
    const fetchCourses = async () => {
      if (isComponentMounted) {
        const courseInfo = await courseInfoService.getAll()
        setCourses(courses.concat(courseInfo))
        return courseInfo
      }
    }
    fetchCourses()
  }, [])
  console.log(courses)
  return (
    <Container>
      <Box>
        <Header name={courseName} />

        {courses?.map(({ name, type, exerciseCount }, index) => (
          <Box key={index}>
            <Content name={name} type={type} exerciseCount={exerciseCount} />
          </Box>
        ))}
      </Box>
    </Container>
  )
}
