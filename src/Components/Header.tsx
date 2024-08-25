import React from 'react'
import FeedBackList from './FeedBackList'
import Pattern from './Pattern'
import Logo from './Logo'
import PageHeading from './PageHeading'
import FeedBackForm from './FeedBackForm'

export default function Header() {
  return (
    <header>
        <Pattern />
        <Logo/>
        <PageHeading/>
        <FeedBackForm/>
    </header>
  )
}
