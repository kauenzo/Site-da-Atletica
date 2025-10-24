import { getLinks } from './actions'
import { LinkList } from './components/LinkList'

export default async function LinksPage() {
  const links = await getLinks()

  return <LinkList links={links} />
}

