import PageHeader from "./PageHeader"



interface ContentWrapperProps {
    children: React.ReactNode
    title: string
    href: string
    linkTitle: string
    titleActive: string

}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
    children,
    title,
    href,
    linkTitle,
    titleActive
}) => {

    return (

        <div className="page-wrapper">
            <div className="content container-fluid">
                <PageHeader title={title} href={href} linkTitle={linkTitle} titleActive={titleActive} />
                {children}
            </div>
        </div>

    )
}

export default ContentWrapper