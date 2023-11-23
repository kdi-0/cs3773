function Footer() {

    const footerStyles = {
        footer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            fontSize: "2.1rem",
            fontWeight: "500",
            textTransform: "capitalize",
            lineHeight: "3rem",
            backgroundColor: '#fff',
            color: '#000',
            paddingTop: "1rem",
        },
        navList: {
            listStyle: 'none',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            fontSize: "1.2rem",
        },
        navItem: {
            margin: '0 15px',
        },
        copyright: {
            fontSize: "0.7rem",
            justifyContent: "left",
            alignItems: "left",
        }
    }

    return (
        <>
            <footer style={footerStyles.footer}>
                <p>Critter Collectibles</p>
                <nav>
                    <ul style={footerStyles.navList}>
                        <li style={footerStyles.navItem}><a href="/">Home</a></li>
                        <li style={footerStyles.navItem}><a href="/about">About</a></li>
                        <li style={footerStyles.navItem}><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <p style={footerStyles.copyright}>&copy; 2023 Critter Collectibles</p>
            </footer>
        </>
    )
}

export default Footer;