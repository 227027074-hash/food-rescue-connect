# Food Rescue Connect

A final-year college demonstration project built using HTML5, CSS3 and vanilla JavaScript.

## Pages
1. Home (`index.html`)
2. Login (`login.html`)
3. Registration (`register.html`)
4. Donate Food (`donate.html`)
5. Available Food (`food-listings.html`)
6. Dashboard (`dashboard.html`)
7. Pickup Requests (`requests.html`)
8. Admin Dashboard (`admin.html`)

## Demo accounts
- Donor: `donor1@demo.com` / `demo123`
- NGO: `ngo1@demo.com` / `demo123`
- Admin: `admin@demo.com` / `admin123`

All accounts and records are fictional demonstration data.

## Run
1. Open this folder in VS Code.
2. Optionally install the Live Server extension.
3. Right-click `index.html` and select **Open with Live Server**.
4. You can also open `index.html` directly in a browser.

## Reset demo data
Open Developer Tools (F12) → Application → Local Storage → select the site's origin, then delete keys beginning with `frc_`. Reload the page to reinitialize sample data. This clears demo accounts, donations, requests and the current session.

## CSV / Power BI
Log in as Admin, open Admin Dashboard and click **Export donations CSV**. In Power BI Desktop choose Home → Get data → Text/CSV and import the downloaded file manually.

## Limitations
- Data is saved in the current browser only; users on other devices do not share data.
- Demo passwords are stored in browser localStorage and are not secure.
- Client-side role checks are not secure access control.
- This prototype does not verify food safety or coordinate real pickups.
- Production use would require secure authentication, a backend, central database, and appropriate operational safeguards.
