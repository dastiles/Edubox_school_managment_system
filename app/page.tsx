
import getCurrentUser from "./actions/getCurrentUser";
import Header from "./components/header/Header";
import Card from "./components/mainpage/Card";
import PageHeader from "./components/mainpage/PageHeader";
import Sidebar from "./components/sidebar/Sidebar";


export default async function Home() {

  const currentUser = await getCurrentUser()

  return (
    <>
      <div className="main-wrapper">
        <Header currentUser={currentUser!} />
        <Sidebar />
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <PageHeader />
            <div className="row">
              <Card title='Students' value='60055' src='/img/icons/dash-icon-01.svg' />
              <Card title='Awards' value='60' src='/img/icons/dash-icon-02.svg' />
              <Card title='Department' value='20' src='/img/icons/dash-icon-03.svg' />
              <Card title='Revenue' value='$2000' src='/img/icons/dash-icon-04.svg' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
