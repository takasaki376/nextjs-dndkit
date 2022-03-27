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
      <Link href='/Sortable'>
        <a >
          Sortable
        </a>
      </Link>
    </div>
  )
}

export default Home
