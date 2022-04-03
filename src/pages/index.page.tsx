import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Link href='/SortableSample'>
        <a >
          SortableSample
        </a>
      </Link>
      <br />
      <Link href='/MultipleContainers'>
        <a >
        MultipleContainers
        </a>
      </Link>
    </div>
  )
}

export default Home
