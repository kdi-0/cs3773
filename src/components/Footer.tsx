import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    const footerStyles: { [key: string]: CSSProperties } = {
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
            marginTop: "2rem", // Adjusted margin for better separation
        },
        navList: {
            listStyle: 'none',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            fontSize: "1.2rem",
            marginBottom: '1rem', // Added margin for better spacing
        },
        navItem: {
            margin: '0 15px',
        },
        socialIcons: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem', // Added margin for better spacing
        },
        socialLink: {
            margin: '0 10px',
            fontSize: '1.5rem',
            color: '#000', // Adjust the color as needed
            textDecoration: 'none',
        },
        copyright: {
            fontSize: "0.7rem",
            marginTop: '1rem', // Added margin for better spacing
        }
    }

    return (
        <>
            <footer style={footerStyles.footer}>
                <p>Critter Collectibles</p>
                <nav>
                    <ul style={footerStyles.navList}>
                        <li style={footerStyles.navItem}><a href="/">Home</a></li>
                        <li style={footerStyles.navItem}><a href="/">About</a></li>
                        <li style={footerStyles.navItem}><a href="/">Contact</a></li>
                        <li style={footerStyles.navItem}><a href="/shop">Products</a></li>
                        <li style={footerStyles.navItem}><a href="/blog">Blog</a></li>
                        {/* Add more links as needed */}
                    </ul>
                </nav>
                <p style={footerStyles.copyright}>&copy; 2023 Critter Collectibles</p>

            </footer>
        </>
    )
}

export default Footer;