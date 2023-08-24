import { gql } from '@apollo/client'
import { getContentfulDirectClient } from '../../lib/apollo-client'

export default async function getTopics(req, res) {
  try {
    const contentfulDirectClient = await getContentfulDirectClient()
    const {
      data: { topics },
    } = await contentfulDirectClient.query({
      query: gql`
        query {
          topics: categoryTopicsCollection {
            items {
              title
            }
          }
        }
      `,
    })

    const {
      data: { subjects },
    } = await contentfulDirectClient.query({
      query: gql`
        query {
          subjects: categorySubjectCollection {
            items {
              title
            }
          }
        }
      `,
    })

    const {
      data: { grades },
    } = await contentfulDirectClient.query({
      query: gql`
        query {
          grades: categoryGradesCollection {
            items {
              title
            }
          }
        }
      `,
    })

    const result = {
      topics: topics.items,
      subjects: subjects.items,
      grades: grades.items,
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
