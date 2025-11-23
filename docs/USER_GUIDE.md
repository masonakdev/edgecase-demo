# EdgeCase User Guide

Welcome to the **EdgeCase** user guide. This document provides instructions for using the application to view, submit, and moderate BASE jumping incident reports.

## Accessing the Application

The application is hosted at: [https://edgecase.masonak.dev](https://edgecase.masonak.dev)

---

## 1. General Users

### 1.1 Viewing Incidents
The home page displays a list of all approved incidents.
- **Browse**: Scroll through the list to read summaries of recent incidents.
- **Details**: Each card shows the ID, category, object type, jump type, location, injuries, and the date of the incident.

### 1.2 Submitting an Incident
To report a new incident:
1. Click the **"Submit Incident"** button in the navigation bar (or go to `/submit`).
2. Fill out the form with the required details.
3. Click **"Submit Report"**.
   - Your report will be sent to the moderation queue for review. It will not appear publicly until approved.

### 1.3 Viewing Reports
To view aggregate statistics:
1. Click **"Reports"** in the navigation bar.
2. Select a **Date Range** (From/To).
   - *Note: The default range is the last 6 months.*
3. Click **"Generate report"**.

---

## 2. Moderators

Moderators have the ability to edit, approve, and retract submitted incidents.

### 2.1 Logging In
1. Navigate to the moderation page: [https://edgecase.masonak.dev/moderation](https://edgecase.masonak.dev/moderation)
2. Enter the moderator password: `edgecase123`
3. Click **"Load queue"**.

### 2.2 Reviewing Submissions
Once logged in, you will see a table of incidents waiting for review. In the **Actions** column, you will see buttons to **Edit**, **Approve**, and **Retract** incidents.

### 2.3 Editing Incidents
When clicking **"Edit"** on an incident card:
1. A form will appear pre-filled with the incident's current data.
2. Make necessary changes (e.g., anonymizing names, fixing typos).
3. Click **"Save Changes"**.
4. You can then **Approve** the modified incident.