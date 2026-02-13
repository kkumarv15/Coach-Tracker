# Coaching Tracker App

A comprehensive web-based coaching CRM application for professional coaches to manage clients, track sessions, and analyze coaching data.

## Features

### Core Functionality
- **Coachee Management**: Track individuals, groups, and teams with detailed profiles
- **Session Logging**: Quick session entry with themes, payment types, and notes
- **Source Tracking**: Monitor where your clients come from
- **Analytics Dashboard**: Comprehensive insights into your coaching practice
- **Lookup Tools**: Quickly find information about coachees, organisations, and sources

### Dashboard Analytics
- Total hours, sessions, and clients with filtering options
- Session breakdown by payment type, weekday, and year
- Client demographics (age groups, sex distribution)
- Top 10 clients and organisations
- Source effectiveness tracking
- Average coaching hours per week/month/year

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or server required - runs entirely in your browser

### Running the Application

1. **Open the application**:
   - Simply open `index.html` in your web browser
   - Or double-click the `index.html` file

2. **Login**:
   - Email: `admin@coach.com`
   - Password: `password`

3. **Start using the app**:
   - Navigate through tabs: Dashboard, Coachees, Sessions, Lookup, Sources
   - All data is saved automatically in your browser's local storage

## User Guide

### Managing Coachees

**Add a New Coachee**:
1. Click "Coachees" tab
2. Click "Add Coachee" button
3. Select type: Individual, Group, or Team
4. Fill in the required fields (marked with *)
5. Click "Save & Close" or "Save & Add Another"

**Individual Fields**:
- First Name, Second Name
- Age Group, Sex, Occupation
- Email, Phone, LinkedIn
- Organisation, City, Country, Source

**Group/Team Fields**:
- Group/Team Name
- Number of Participants
- Members (free text for notes)
- Organisation, City, Country, Source

**Edit/Delete**:
- Use the Edit button to modify coachee details
- Use the Delete button to remove a coachee (with confirmation)

### Logging Sessions

**Add a Session**:
1. Click "Sessions" tab
2. Click "Add Session" button
3. Select coachee type and name
4. Enter session date and duration
5. Select theme(s) - multiple selections allowed:
   - Habits, Well-being, Productivity
   - Communication, Career, Relationships
   - Other Personal, Other Professional
6. Select payment type: Paid, Pro Bono, or Peer
7. Add session notes (optional)
8. Click "Save & Close" or "Save & Add Another"

### Managing Sources

**Add a Source**:
1. Click "Sources" tab
2. Click "Add Source" button
3. Enter source name (required)
4. Add country and website (optional)
5. Click "Save"

Sources help you track where your coachees come from (e.g., referral partners, platforms, events).

### Using the Dashboard

**Apply Filters**:
- Date Range: This Month, This Quarter, This Year, All Time
- Coachee Type: All, Individual, Group, Team
- Payment Type: Multiple selections allowed
- Click "Apply Filters" to refresh all metrics

**Dashboard Sections**:
1. **KPI Cards**: Quick overview of key metrics
2. **Charts**: Visual breakdowns of your practice
3. **Top Lists**: Top 10 clients and organisations
4. **Average Hours**: Weekly, monthly, and yearly averages
5. **Data Tables**: Complete lists with search and sort

### Lookup Tools

**Coachee Lookup**:
1. Click "Lookup" tab
2. Select "Coachee" sub-tab
3. Filter by coachee type
4. Select a coachee from dropdown
5. View detailed profile, stats, and session history

**Organisation Lookup**:
1. Select "Organisation" sub-tab
2. Choose an organisation
3. View all coachees, sessions, and sources for that organisation

**Source Lookup**:
1. Select "Source" sub-tab
2. Choose a source
3. View all organisations and coachees from that source

## Data Storage

- All data is stored in your browser's **Local Storage**
- Data persists across browser sessions
- Data is private and stays on your device
- **Important**: Clearing browser data will delete all records
- **Backup**: No automatic backup - consider exporting data periodically

## Technical Details

### Technologies Used
- HTML5
- CSS3 (responsive design)
- Vanilla JavaScript (ES6+)
- Chart.js for visualizations
- Local Storage API for data persistence

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### File Structure
```
coaching-tracker/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── app.js             # Application logic
└── README.md          # This file
```

## Features Implemented

### Data Management
✅ Add, edit, delete coachees (individuals, groups, teams)  
✅ Add, edit, delete sessions  
✅ Add, edit, delete sources  
✅ Automatic ID generation  
✅ Timestamps for all records  
✅ Data validation and constraints  

### User Interface
✅ Login/logout functionality  
✅ Tab-based navigation  
✅ Modal forms for data entry  
✅ Responsive design  
✅ Toast notifications  
✅ Search and filter capabilities  

### Analytics & Reporting
✅ Dashboard with KPIs  
✅ Multiple chart types (pie, doughnut, bar, line)  
✅ Filtering by date range, type, and payment  
✅ Top 10 lists  
✅ Average calculations  
✅ Engagement metrics  

### Lookup Features
✅ Coachee lookup with session history  
✅ Organisation lookup with coachees list  
✅ Source lookup with organisations  
✅ Dynamic dropdown filtering  

## Business Rules

1. **Coachee Constraints**:
   - Email unique per individual (recommended)
   - Group/Team name + organisation unique per account
   - Required fields enforced based on type

2. **Session Constraints**:
   - Duration must be > 0
   - At least one theme required
   - Must be linked to an existing coachee

3. **Source Constraints**:
   - Source name must be unique
   - Deletion confirmation if linked to coachees

4. **Data Integrity**:
   - Sessions preserved when deleting coachees (with warning)
   - Soft-delete approach for historical data
   - Referential integrity maintained

## Tips for Best Use

1. **Start with Sources**: Add your referral sources first
2. **Add Coachees**: Complete profiles for better analytics
3. **Log Sessions Promptly**: Enter sessions soon after they occur
4. **Review Dashboard Weekly**: Monitor your practice trends
5. **Use Filters**: Analyze specific time periods or client types
6. **Check Lookups**: Review individual client progress regularly

## Future Enhancements

Potential features for future versions:
- Multi-coach accounts with role-based access
- Data export (CSV, PDF)
- Client-facing portal
- Calendar integration
- Automated invoicing
- Email notifications
- Cloud synchronization
- Mobile app

## Support

For issues or questions:
- Review this README
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser if issues persist

## License

This is a demo application for educational purposes.

## Version

Version 1.0.0 - January 2026

---

**Demo Credentials**:
- Email: admin@coach.com
- Password: password

**Note**: This application stores all data locally in your browser. No data is sent to any server.
