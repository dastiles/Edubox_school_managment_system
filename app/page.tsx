'use client'
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";


export default function Home() {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />
      </div>
    </>
  )
}
