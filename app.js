// Coaching Tracker App - Main JavaScript File
// Data Storage using LocalStorage

class CoachingTracker {
    constructor() {
        this.currentUser = null;
        this.coachees = [];
        this.sessions = [];
        this.sources = [];
        this.charts = {};
        this.editingCoachee = null;
        this.editingSession = null;
        this.editingSource = null;
        this.init();
    }

    init() {
        this.loadData();
        this.seedDemoDataIfEmpty();
        this.setupEventListeners();
        this.checkAuth();
    }

    // ==================== DATA MANAGEMENT ====================
    
    loadData() {
        this.coachees = JSON.parse(localStorage.getItem('coachees') || '[]');
        this.sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
        this.sources = JSON.parse(localStorage.getItem('sources') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    saveData() {
        localStorage.setItem('coachees', JSON.stringify(this.coachees));
        localStorage.setItem('sessions', JSON.stringify(this.sessions));
        localStorage.setItem('sources', JSON.stringify(this.sources));
    }

    seedDemoDataIfEmpty() {
        const hasExistingData = this.coachees.length > 0 || this.sessions.length > 0 || this.sources.length > 0;
        if (hasExistingData) return;

        const now = new Date();
        const toDate = (daysAgo) => {
            const d = new Date(now);
            d.setDate(d.getDate() - daysAgo);
            return d.toISOString().split('T')[0];
        };

        const source1 = {
            id: this.generateId(),
            name: 'LinkedIn Referral',
            country: 'India',
            website: 'https://www.linkedin.com',
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const source2 = {
            id: this.generateId(),
            name: 'Corporate HR Partner',
            country: 'India',
            website: 'https://example.com/hr-partner',
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const source3 = {
            id: this.generateId(),
            name: 'Word of Mouth',
            country: 'India',
            website: '',
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        this.sources = [source1, source2, source3];

        const coachee1 = {
            id: this.generateId(),
            type: 'Individual',
            firstName: 'Aarav',
            secondName: 'Sharma',
            ageGroup: '30-40',
            sex: 'Male',
            email: 'aarav.sharma@example.com',
            phone: '+91-9876543210',
            linkedin: 'https://linkedin.com/in/aaravsharma',
            occupation: 'Employed',
            organisation: 'TechNova Solutions',
            city: 'Bengaluru',
            country: 'India',
            sourceId: source1.id,
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const coachee2 = {
            id: this.generateId(),
            type: 'Individual',
            firstName: 'Priya',
            secondName: 'Nair',
            ageGroup: '20-30',
            sex: 'Female',
            email: 'priya.nair@example.com',
            phone: '+91-9123456780',
            linkedin: 'https://linkedin.com/in/priyanair',
            occupation: 'Self-employed',
            organisation: 'Nair Consulting',
            city: 'Mumbai',
            country: 'India',
            sourceId: source3.id,
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const coachee3 = {
            id: this.generateId(),
            type: 'Team',
            groupTeamName: 'Product Leadership Team',
            numParticipants: 8,
            members: 'VP Product, 3 Product Managers, 4 Senior PMs',
            organisation: 'FinEdge Corp',
            city: 'Pune',
            country: 'India',
            sourceId: source2.id,
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const coachee4 = {
            id: this.generateId(),
            type: 'Group',
            groupTeamName: 'Emerging Managers Cohort',
            numParticipants: 12,
            members: 'Cross-functional first-time managers',
            organisation: 'TechNova Solutions',
            city: 'Bengaluru',
            country: 'India',
            sourceId: source2.id,
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        this.coachees = [coachee1, coachee2, coachee3, coachee4];

        this.sessions = [
            {
                id: this.generateId(),
                coacheeId: coachee1.id,
                coacheeType: coachee1.type,
                sessionDate: toDate(21),
                duration: 1.5,
                theme: ['Career', 'Communication'],
                paymentType: 'Paid',
                notes: 'Defined growth roadmap and stakeholder communication plan.',
                createdOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            },
            {
                id: this.generateId(),
                coacheeId: coachee1.id,
                coacheeType: coachee1.type,
                sessionDate: toDate(10),
                duration: 1.0,
                theme: ['Productivity', 'Habits'],
                paymentType: 'Paid',
                notes: 'Implemented weekly planning and focus rituals.',
                createdOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            },
            {
                id: this.generateId(),
                coacheeId: coachee2.id,
                coacheeType: coachee2.type,
                sessionDate: toDate(18),
                duration: 1.0,
                theme: ['Well-being', 'Relationships'],
                paymentType: 'Peer',
                notes: 'Worked on boundaries and burnout prevention.',
                createdOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            },
            {
                id: this.generateId(),
                coacheeId: coachee3.id,
                coacheeType: coachee3.type,
                sessionDate: toDate(15),
                duration: 2.0,
                theme: ['Communication', 'Other Professional'],
                paymentType: 'Paid',
                notes: 'Team alignment workshop focused on decision clarity.',
                createdOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            },
            {
                id: this.generateId(),
                coacheeId: coachee4.id,
                coacheeType: coachee4.type,
                sessionDate: toDate(7),
                duration: 1.5,
                theme: ['Leadership', 'Career'],
                paymentType: 'Pro Bono',
                notes: 'Group coaching on first-90-days leadership transitions.',
                createdOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            }
        ];

        this.saveData();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // ==================== AUTHENTICATION ====================
    
    checkAuth() {
        if (this.currentUser) {
            this.showMainApp();
        } else {
            this.showLoginScreen();
        }
    }

    showLoginScreen() {
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('mainApp').classList.remove('active');
    }

    showMainApp() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('mainApp').classList.add('active');
        this.refreshAllData();
    }

    login(email, password) {
        // Simple demo authentication
        if (email === 'admin@coach.com' && password === 'password') {
            this.currentUser = { email, name: 'Demo Coach' };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showMainApp();
            this.showToast('Login successful!');
        } else {
            this.showToast('Invalid credentials', 'error');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showLoginScreen();
        this.showToast('Logged out successfully');
    }

    // ==================== COACHEE MANAGEMENT ====================
    
    addCoachee(data) {
        const coachee = {
            id: this.generateId(),
            type: data.type,
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            ...data
        };
        this.coachees.push(coachee);
        this.saveData();
        return coachee;
    }

    updateCoachee(id, data) {
        const index = this.coachees.findIndex(c => c.id === id);
        if (index !== -1) {
            this.coachees[index] = {
                ...this.coachees[index],
                ...data,
                lastUpdated: new Date().toISOString()
            };
            this.saveData();
            return this.coachees[index];
        }
        return null;
    }

    deleteCoachee(id) {
        const hasSessions = this.sessions.some(s => s.coacheeId === id);
        if (hasessions) {
            if (!confirm('This coachee has sessions. Are you sure you want to delete? Historical data will be preserved.')) {
                return false;
            }
        }
        this.coachees = this.coachees.filter(c => c.id !== id);
        this.saveData();
        return true;
    }

    getCoachee(id) {
        return this.coachees.find(c => c.id === id);
    }

    getCoacheesByType(type) {
        if (type === 'all') return this.coachees;
        return this.coachees.filter(c => c.type === type);
    }

    // ==================== SESSION MANAGEMENT ====================
    
    addSession(data) {
        const coachee = this.getCoachee(data.coacheeId);
        const session = {
            id: this.generateId(),
            coacheeId: data.coacheeId,
            coacheeType: coachee.type,
            sessionDate: data.sessionDate,
            duration: parseFloat(data.duration),
            theme: data.theme,
            paymentType: data.paymentType,
            notes: data.notes || '',
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
        this.sessions.push(session);
        this.saveData();
        return session;
    }

    updateSession(id, data) {
        const index = this.sessions.findIndex(s => s.id === id);
        if (index !== -1) {
            this.sessions[index] = {
                ...this.sessions[index],
                ...data,
                duration: parseFloat(data.duration),
                lastUpdated: new Date().toISOString()
            };
            this.saveData();
            return this.sessions[index];
        }
        return null;
    }

    deleteSession(id) {
        if (confirm('Are you sure you want to delete this session?')) {
            this.sessions = this.sessions.filter(s => s.id !== id);
            this.saveData();
            return true;
        }
        return false;
    }

    getSession(id) {
        return this.sessions.find(s => s.id === id);
    }

    getSessionsForCoachee(coacheeId) {
        return this.sessions.filter(s => s.coacheeId === coacheeId);
    }

    // ==================== SOURCE MANAGEMENT ====================
    
    addSource(data) {
        // Check for duplicate
        if (this.sources.some(s => s.name.toLowerCase() === data.name.toLowerCase())) {
            this.showToast('Source name already exists', 'error');
            return null;
        }
        const source = {
            id: this.generateId(),
            name: data.name,
            country: data.country || '',
            website: data.website || '',
            createdOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
        this.sources.push(source);
        this.saveData();
        return source;
    }

    updateSource(id, data) {
        const index = this.sources.findIndex(s => s.id === id);
        if (index !== -1) {
            this.sources[index] = {
                ...this.sources[index],
                ...data,
                lastUpdated: new Date().toISOString()
            };
            this.saveData();
            return this.sources[index];
        }
        return null;
    }

    deleteSource(id) {
        const linkedCoachees = this.coachees.filter(c => c.sourceId === id);
        if (linkedCoachees.length > 0) {
            if (!confirm(`This source has ${linkedCoachees.length} linked coachee(s). Delete anyway?`)) {
                return false;
            }
        }
        this.sources = this.sources.filter(s => s.id !== id);
        this.saveData();
        return true;
    }

    getSource(id) {
        return this.sources.find(s => s.id === id);
    }

    // ==================== ANALYTICS & DASHBOARD ====================
    
    getDashboardData(filters = {}) {
        let filteredSessions = this.sessions;

        // Apply date range filter
        if (filters.dateRange) {
            const now = new Date();
            let startDate;
            
            switch (filters.dateRange) {
                case 'thisMonth':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'thisQuarter':
                    const quarter = Math.floor(now.getMonth() / 3);
                    startDate = new Date(now.getFullYear(), quarter * 3, 1);
                    break;
                case 'thisYear':
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
                default:
                    startDate = new Date(0);
            }
            
            filteredSessions = filteredSessions.filter(s => 
                new Date(s.sessionDate) >= startDate
            );
        }

        // Apply coachee type filter
        if (filters.coacheeType && filters.coacheeType !== 'all') {
            filteredSessions = filteredSessions.filter(s => 
                s.coacheeType === filters.coacheeType
            );
        }

        // Apply payment type filter
        if (filters.paymentTypes && filters.paymentTypes.length > 0) {
            filteredSessions = filteredSessions.filter(s => 
                filters.paymentTypes.includes(s.paymentType)
            );
        }

        // Calculate metrics
        const totalHours = filteredSessions.reduce((sum, s) => sum + s.duration, 0);
        const totalSessions = filteredSessions.length;
        const uniqueCoachees = new Set(filteredSessions.map(s => s.coacheeId));
        const totalClients = uniqueCoachees.size;
        const avgSessionsPerClient = totalClients > 0 ? (totalSessions / totalClients).toFixed(1) : 0;

        return {
            totalHours: totalHours.toFixed(1),
            totalSessions,
            totalClients,
            avgSessionsPerClient,
            sessions: filteredSessions
        };
    }

    getPaymentTypeBreakdown(sessions) {
        const breakdown = {};
        sessions.forEach(s => {
            breakdown[s.paymentType] = (breakdown[s.paymentType] || 0) + 1;
        });
        return breakdown;
    }

    getWeekdayBreakdown(sessions) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const breakdown = {};
        days.forEach(day => breakdown[day] = 0);
        
        sessions.forEach(s => {
            const date = new Date(s.sessionDate);
            const dayName = days[date.getDay()];
            breakdown[dayName]++;
        });
        return breakdown;
    }

    getYearlyHours(sessions) {
        const yearly = {};
        sessions.forEach(s => {
            const year = new Date(s.sessionDate).getFullYear();
            yearly[year] = (yearly[year] || 0) + s.duration;
        });
        return yearly;
    }

    getAgeGroupBreakdown() {
        const individuals = this.coachees.filter(c => c.type === 'Individual' && c.ageGroup);
        const breakdown = {};
        individuals.forEach(c => {
            breakdown[c.ageGroup] = (breakdown[c.ageGroup] || 0) + 1;
        });
        return breakdown;
    }

    getSexBreakdown() {
        const individuals = this.coachees.filter(c => c.type === 'Individual' && c.sex);
        const breakdown = {};
        individuals.forEach(c => {
            breakdown[c.sex] = (breakdown[c.sex] || 0) + 1;
        });
        return breakdown;
    }

    getSourceHours(sessions) {
        const sourceHours = {};
        sessions.forEach(s => {
            const coachee = this.getCoachee(s.coacheeId);
            if (coachee && coachee.sourceId) {
                const source = this.getSource(coachee.sourceId);
                if (source) {
                    sourceHours[source.name] = (sourceHours[source.name] || 0) + s.duration;
                }
            }
        });
        return sourceHours;
    }

    getTopClients(limit = 10) {
        const clientSessions = {};
        this.sessions.forEach(s => {
            if (!clientSessions[s.coacheeId]) {
                clientSessions[s.coacheeId] = {
                    count: 0,
                    hours: 0
                };
            }
            clientSessions[s.coacheeId].count++;
            clientSessions[s.coacheeId].hours += s.duration;
        });

        return Object.entries(clientSessions)
            .map(([id, data]) => {
                const coachee = this.getCoachee(id);
                return {
                    coachee,
                    sessions: data.count,
                    hours: data.hours
                };
            })
            .sort((a, b) => b.sessions - a.sessions)
            .slice(0, limit);
    }

    getTopOrganisations(limit = 10) {
        const orgData = {};
        
        this.sessions.forEach(s => {
            const coachee = this.getCoachee(s.coacheeId);
            if (coachee && coachee.organisation) {
                if (!orgData[coachee.organisation]) {
                    orgData[coachee.organisation] = {
                        sessions: 0,
                        hours: 0,
                        coachees: new Set()
                    };
                }
                orgData[coachee.organisation].sessions++;
                orgData[coachee.organisation].hours += s.duration;
                orgData[coachee.organisation].coachees.add(coachee.id);
            }
        });

        return Object.entries(orgData)
            .map(([name, data]) => ({
                name,
                sessions: data.sessions,
                hours: data.hours,
                coacheeCount: data.coachees.size
            }))
            .sort((a, b) => b.sessions - a.sessions)
            .slice(0, limit);
    }

    calculateAverageHours(sessions) {
        if (sessions.length === 0) {
            return { week: 0, month: 0, year: 0 };
        }

        const totalHours = sessions.reduce((sum, s) => sum + s.duration, 0);
        const dates = sessions.map(s => new Date(s.sessionDate));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const daysDiff = Math.max(1, (maxDate - minDate) / (1000 * 60 * 60 * 24));

        return {
            week: (totalHours / (daysDiff / 7)).toFixed(1),
            month: (totalHours / (daysDiff / 30.44)).toFixed(1),
            year: (totalHours / (daysDiff / 365.25)).toFixed(1)
        };
    }

    getCoacheeStats(coacheeId) {
        const sessions = this.getSessionsForCoachee(coacheeId);
        const totalSessions = sessions.length;
        const totalHours = sessions.reduce((sum, s) => sum + s.duration, 0);
        
        let engagementDays = 0;
        if (sessions.length > 1) {
            const dates = sessions.map(s => new Date(s.sessionDate));
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));
            engagementDays = Math.floor((maxDate - minDate) / (1000 * 60 * 60 * 24));
        }

        return {
            totalSessions,
            totalHours: totalHours.toFixed(1),
            engagementDays
        };
    }

    getOrganisationStats(orgName) {
        const orgCoachees = this.coachees.filter(c => c.organisation === orgName);
        const orgSessions = this.sessions.filter(s => {
            const coachee = this.getCoachee(s.coacheeId);
            return coachee && coachee.organisation === orgName;
        });

        const sources = new Set();
        orgCoachees.forEach(c => {
            if (c.sourceId) {
                const source = this.getSource(c.sourceId);
                if (source) sources.add(source.name);
            }
        });

        return {
            coacheeCount: orgCoachees.length,
            sessionCount: orgSessions.length,
            sources: Array.from(sources),
            coachees: orgCoachees
        };
    }

    getSourceStats(sourceId) {
        const sourceCoachees = this.coachees.filter(c => c.sourceId === sourceId);
        const sourceSessions = this.sessions.filter(s => {
            const coachee = this.getCoachee(s.coacheeId);
            return coachee && coachee.sourceId === sourceId;
        });

        const organisations = new Set();
        sourceCoachees.forEach(c => {
            if (c.organisation) organisations.add(c.organisation);
        });

        return {
            coacheeCount: sourceCoachees.length,
            sessionCount: sourceSessions.length,
            organisations: Array.from(organisations),
            coachees: sourceCoachees
        };
    }

    getAllOrganisations() {
        const orgs = {};
        this.coachees.forEach(c => {
            if (c.organisation) {
                if (!orgs[c.organisation]) {
                    orgs[c.organisation] = {
                        coachees: 0,
                        sessions: 0,
                        hours: 0,
                        country: c.country || ''
                    };
                }
                orgs[c.organisation].coachees++;
                
                const sessions = this.getSessionsForCoachee(c.id);
                orgs[c.organisation].sessions += sessions.length;
                orgs[c.organisation].hours += sessions.reduce((sum, s) => sum + s.duration, 0);
            }
        });

        return Object.entries(orgs).map(([name, data]) => ({
            name,
            ...data
        }));
    }

    // ==================== UI RENDERING ====================
    
    refreshAllData() {
        this.renderCoacheesTable();
        this.renderSessionsTable();
        this.renderSourcesTable();
        this.renderDashboard();
        this.updateLookupDropdowns();
        this.updateSourceDropdowns();
        this.updateOrganisationAutocomplete();
    }

    renderDashboard() {
        const filters = {
            dateRange: document.getElementById('dashDateRange').value,
            coacheeType: document.getElementById('dashCoacheeType').value,
            paymentTypes: Array.from(document.getElementById('dashPaymentType').selectedOptions).map(o => o.value)
        };

        const data = this.getDashboardData(filters);

        // Update KPIs
        document.getElementById('kpiTotalHours').textContent = data.totalHours;
        document.getElementById('kpiTotalSessions').textContent = data.totalSessions;
        document.getElementById('kpiTotalClients').textContent = data.totalClients;
        document.getElementById('kpiAvgSessions').textContent = data.avgSessionsPerClient;

        // Render charts
        this.renderPaymentTypeChart(data.sessions);
        this.renderWeekdayChart(data.sessions);
        this.renderYearChart(data.sessions);
        this.renderAgeGroupChart();
        this.renderSexChart();
        this.renderSourceChart(data.sessions);

        // Render top lists
        this.renderTopClients();
        this.renderTopOrganisations();

        // Render average hours
        const avgHours = this.calculateAverageHours(data.sessions);
        document.getElementById('avgWeek').textContent = avgHours.week;
        document.getElementById('avgMonth').textContent = avgHours.month;
        document.getElementById('avgYear').textContent = avgHours.year;

        // Render data tables
        this.renderAllCoacheesTable();
        this.renderAllSessionsTable();
        this.renderAllOrganisationsTable();
    }

    renderPaymentTypeChart(sessions) {
        const breakdown = this.getPaymentTypeBreakdown(sessions);
        const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
        
        const textHtml = Object.entries(breakdown)
            .map(([type, count]) => {
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                return `<div>${type}: ${count} (${percent}%)</div>`;
            })
            .join('');
        document.getElementById('paymentTypeText').innerHTML = textHtml;

        this.destroyChart('paymentTypeChart');
        const ctx = document.getElementById('paymentTypeChart').getContext('2d');
        this.charts.paymentTypeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(breakdown),
                datasets: [{
                    data: Object.values(breakdown),
                    backgroundColor: ['#667eea', '#28a745', '#ffc107']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    renderWeekdayChart(sessions) {
        const breakdown = this.getWeekdayBreakdown(sessions);
        
        this.destroyChart('weekdayChart');
        const ctx = document.getElementById('weekdayChart').getContext('2d');
        this.charts.weekdayChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(breakdown),
                datasets: [{
                    label: 'Sessions',
                    data: Object.values(breakdown),
                    backgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    renderYearChart(sessions) {
        const yearly = this.getYearlyHours(sessions);
        
        this.destroyChart('yearChart');
        const ctx = document.getElementById('yearChart').getContext('2d');
        this.charts.yearChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(yearly).sort(),
                datasets: [{
                    label: 'Hours',
                    data: Object.values(yearly),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    renderAgeGroupChart() {
        const breakdown = this.getAgeGroupBreakdown();
        const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
        
        const textHtml = Object.entries(breakdown)
            .map(([group, count]) => {
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                return `<div>${group}: ${count} (${percent}%)</div>`;
            })
            .join('');
        document.getElementById('ageGroupText').innerHTML = textHtml || '<div>No data</div>';

        this.destroyChart('ageGroupChart');
        const ctx = document.getElementById('ageGroupChart').getContext('2d');
        this.charts.ageGroupChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(breakdown),
                datasets: [{
                    data: Object.values(breakdown),
                    backgroundColor: ['#667eea', '#28a745', '#ffc107', '#dc3545', '#17a2b8']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    renderSexChart() {
        const breakdown = this.getSexBreakdown();
        const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
        
        const textHtml = Object.entries(breakdown)
            .map(([sex, count]) => {
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                return `<div>${sex}: ${count} (${percent}%)</div>`;
            })
            .join('');
        document.getElementById('sexText').innerHTML = textHtml || '<div>No data</div>';

        this.destroyChart('sexChart');
        const ctx = document.getElementById('sexChart').getContext('2d');
        this.charts.sexChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(breakdown),
                datasets: [{
                    data: Object.values(breakdown),
                    backgroundColor: ['#667eea', '#28a745', '#ffc107', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    renderSourceChart(sessions) {
        const sourceHours = this.getSourceHours(sessions);
        const total = Object.values(sourceHours).reduce((a, b) => a + b, 0);
        
        const textHtml = Object.entries(sourceHours)
            .map(([source, hours]) => {
                const percent = total > 0 ? ((hours / total) * 100).toFixed(1) : 0;
                return `<div>${source}: ${hours.toFixed(1)} hrs (${percent}%)</div>`;
            })
            .join('');
        document.getElementById('sourceText').innerHTML = textHtml || '<div>No data</div>';

        this.destroyChart('sourceChart');
        const ctx = document.getElementById('sourceChart').getContext('2d');
        this.charts.sourceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(sourceHours),
                datasets: [{
                    data: Object.values(sourceHours),
                    backgroundColor: ['#667eea', '#28a745', '#ffc107', '#dc3545', '#17a2b8']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    renderTopClients() {
        const topClients = this.getTopClients();
        const html = topClients.map(item => {
            const name = this.getCoacheeName(item.coachee);
            const org = item.coachee.organisation || 'N/A';
            return `
                <div class="top-list-item">
                    <div>
                        <strong>${name}</strong><br>
                        <small>${org}</small>
                    </div>
                    <div style="text-align: right;">
                        <strong>${item.sessions} sessions</strong><br>
                        <small>${item.hours.toFixed(1)} hrs</small>
                    </div>
                </div>
            `;
        }).join('');
        document.getElementById('topClients').innerHTML = html || '<div class="empty-state">No data</div>';
    }

    renderTopOrganisations() {
        const topOrgs = this.getTopOrganisations();
        const html = topOrgs.map(item => `
            <div class="top-list-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.coacheeCount} coachee(s)</small>
                </div>
                <div style="text-align: right;">
                    <strong>${item.sessions} sessions</strong><br>
                    <small>${item.hours.toFixed(1)} hrs</small>
                </div>
            </div>
        `).join('');
        document.getElementById('topOrganisations').innerHTML = html || '<div class="empty-state">No data</div>';
    }

    renderAllCoacheesTable() {
        const tbody = document.getElementById('allCoacheesTable').querySelector('tbody');
        const searchTerm = document.getElementById('searchCoachees').value.toLowerCase();
        
        let coachees = this.coachees.filter(c => {
            const name = this.getCoacheeName(c).toLowerCase();
            const org = (c.organisation || '').toLowerCase();
            return name.includes(searchTerm) || org.includes(searchTerm);
        });

        const html = coachees.map(c => {
            const stats = this.getCoacheeStats(c.id);
            const sourceName = c.sourceId ? (this.getSource(c.sourceId)?.name || '') : '';
            return `
                <tr>
                    <td>${this.getCoacheeName(c)}</td>
                    <td>${c.type}</td>
                    <td>${c.organisation || ''}</td>
                    <td>${sourceName}</td>
                    <td>${c.country || ''}</td>
                    <td>${c.city || ''}</td>
                    <td>${stats.totalSessions}</td>
                    <td>${stats.totalHours}</td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = html || '<tr><td colspan="8" class="empty-state">No coachees found</td></tr>';
    }

    renderAllSessionsTable() {
        const tbody = document.getElementById('allSessionsTable').querySelector('tbody');
        const sessions = [...this.sessions].sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate));

        const html = sessions.map(s => {
            const coachee = this.getCoachee(s.coacheeId);
            const coacheeName = coachee ? this.getCoacheeName(coachee) : 'Unknown';
            const org = coachee?.organisation || '';
            const sourceName = coachee?.sourceId ? (this.getSource(coachee.sourceId)?.name || '') : '';
            return `
                <tr>
                    <td>${this.formatDate(s.sessionDate)}</td>
                    <td>${coacheeName}</td>
                    <td>${org}</td>
                    <td>${sourceName}</td>
                    <td>${s.duration}</td>
                    <td>${s.paymentType}</td>
                    <td>${Array.isArray(s.theme) ? s.theme.join(', ') : s.theme}</td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = html || '<tr><td colspan="7" class="empty-state">No sessions found</td></tr>';
    }

    renderAllOrganisationsTable() {
        const tbody = document.getElementById('allOrganisationsTable').querySelector('tbody');
        const orgs = this.getAllOrganisations();

        const html = orgs.map(org => `
            <tr>
                <td>${org.name}</td>
                <td>${org.country}</td>
                <td>${org.coachees}</td>
                <td>${org.sessions}</td>
                <td>${org.hours.toFixed(1)}</td>
            </tr>
        `).join('');
        tbody.innerHTML = html || '<tr><td colspan="5" class="empty-state">No organisations found</td></tr>';
    }

    renderCoacheesTable() {
        const tbody = document.getElementById('coacheesTable').querySelector('tbody');
        const html = this.coachees.map(c => {
            const stats = this.getCoacheeStats(c.id);
            const sourceName = c.sourceId ? (this.getSource(c.sourceId)?.name || '') : '';
            return `
                <tr>
                    <td>${this.getCoacheeName(c)}</td>
                    <td>${c.type}</td>
                    <td>${c.organisation || ''}</td>
                    <td>${c.city || ''}</td>
                    <td>${c.country || ''}</td>
                    <td>${sourceName}</td>
                    <td>${stats.totalSessions}</td>
                    <td>
                        <button class="btn-edit" onclick="app.editCoachee('${c.id}')">Edit</button>
                        <button class="btn-delete" onclick="app.removeCoachee('${c.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = html || '<tr><td colspan="8" class="empty-state">No coachees yet. Click "Add Coachee" to get started.</td></tr>';
    }

    renderSessionsTable() {
        const tbody = document.getElementById('sessionsTable').querySelector('tbody');
        const sessions = [...this.sessions].sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate));

        const html = sessions.map(s => {
            const coachee = this.getCoachee(s.coacheeId);
            const coacheeName = coachee ? this.getCoacheeName(coachee) : 'Unknown';
            const org = coachee?.organisation || '';
            const sourceName = coachee?.sourceId ? (this.getSource(coachee.sourceId)?.name || '') : '';
            return `
                <tr>
                    <td>${this.formatDate(s.sessionDate)}</td>
                    <td>${coacheeName}</td>
                    <td>${org}</td>
                    <td>${sourceName}</td>
                    <td>${s.duration}</td>
                    <td>${s.paymentType}</td>
                    <td>${Array.isArray(s.theme) ? s.theme.join(', ') : s.theme}</td>
                    <td>
                        <button class="btn-edit" onclick="app.editSession('${s.id}')">Edit</button>
                        <button class="btn-delete" onclick="app.removeSession('${s.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = html || '<tr><td colspan="8" class="empty-state">No sessions yet. Click "Add Session" to get started.</td></tr>';
    }

    renderSourcesTable() {
        const tbody = document.getElementById('sourcesTable').querySelector('tbody');
        const html = this.sources.map(s => {
            const linkedCoachees = this.coachees.filter(c => c.sourceId === s.id);
            const linkedSessions = this.sessions.filter(sess => {
                const coachee = this.getCoachee(sess.coacheeId);
                return coachee && coachee.sourceId === s.id;
            });
            return `
                <tr>
                    <td>${s.name}</td>
                    <td>${s.country}</td>
                    <td>${s.website ? `<a href="${s.website}" target="_blank">${s.website}</a>` : ''}</td>
                    <td>${linkedCoachees.length}</td>
                    <td>${linkedSessions.length}</td>
                    <td>
                        <button class="btn-edit" onclick="app.editSource('${s.id}')">Edit</button>
                        <button class="btn-delete" onclick="app.removeSource('${s.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = html || '<tr><td colspan="6" class="empty-state">No sources yet. Click "Add Source" to get started.</td></tr>';
    }

    // ==================== HELPER FUNCTIONS ====================

    getCoacheeName(coachee) {
        if (!coachee) return 'Unknown';
        if (coachee.type === 'Individual') {
            return `${coachee.firstName} ${coachee.secondName || ''}`.trim();
        }
        return coachee.groupTeamName || 'Unnamed Group/Team';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type === 'error' ? 'error' : ''}`;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    destroyChart(chartId) {
        if (this.charts[chartId]) {
            this.charts[chartId].destroy();
            delete this.charts[chartId];
        }
    }

    // ==================== EVENT HANDLERS ====================

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            this.login(email, password);
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Navigation tabs
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = link.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Sub tabs
        document.querySelectorAll('.sub-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const parent = tab.closest('.tab-content');
                const subtabName = tab.dataset.subtab;
                parent.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
                parent.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                parent.querySelector(`#${subtabName}`).classList.add('active');
            });
        });

        // Add buttons
        document.getElementById('addCoacheeBtn').addEventListener('click', () => this.openCoacheeModal());
        document.getElementById('addSessionBtn').addEventListener('click', () => this.openSessionModal());
        document.getElementById('addSourceBtn').addEventListener('click', () => this.openSourceModal());

        // Modal close buttons
        document.querySelectorAll('.close, .btn-cancel').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });

        // Coachee form
        document.getElementById('coacheeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCoachee();
        });

        document.getElementById('saveAndAddAnother').addEventListener('click', () => {
            this.saveCoachee(true);
        });

        // Session form
        document.getElementById('sessionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSession();
        });

        document.getElementById('saveSessionAndAddAnother').addEventListener('click', () => {
            this.saveSession(true);
        });

        // Source form
        document.getElementById('sourceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSource();
        });

        // Coachee type radio buttons
        document.querySelectorAll('input[name="coacheeType"]').forEach(radio => {
            radio.addEventListener('change', () => this.toggleCoacheeFields());
        });

        // Session coachee type radio buttons
        document.querySelectorAll('input[name="sessionCoacheeType"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateSessionCoacheeDropdown());
        });

        // Dashboard filters
        document.getElementById('applyDashFilters').addEventListener('click', () => {
            this.renderDashboard();
        });

        // Search coachees
        document.getElementById('searchCoachees').addEventListener('input', () => {
            this.renderAllCoacheesTable();
        });

        // Lookup filters
        document.getElementById('lookupCoacheeType').addEventListener('change', () => {
            this.updateLookupCoacheeDropdown();
        });

        document.getElementById('lookupCoacheeName').addEventListener('change', (e) => {
            if (e.target.value) {
                this.displayCoacheeDetails(e.target.value);
            }
        });

        document.getElementById('lookupOrganisationName').addEventListener('change', (e) => {
            if (e.target.value) {
                this.displayOrganisationDetails(e.target.value);
            }
        });

        document.getElementById('lookupSourceName').addEventListener('change', (e) => {
            if (e.target.value) {
                this.displaySourceDetails(e.target.value);
            }
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');

        if (tabName === 'dashboard') {
            this.renderDashboard();
        }
    }

    // ==================== MODAL MANAGEMENT ====================

    openCoacheeModal(coacheeId = null) {
        this.editingCoachee = coacheeId;
        const modal = document.getElementById('coacheeModal');
        const title = document.getElementById('coacheeModalTitle');
        const form = document.getElementById('coacheeForm');
        form.reset();

        if (coacheeId) {
            title.textContent = 'Edit Coachee';
            const coachee = this.getCoachee(coacheeId);
            this.populateCoacheeForm(coachee);
        } else {
            title.textContent = 'Add Coachee';
            document.querySelector('input[name="coacheeType"][value="Individual"]').checked = true;
            this.toggleCoacheeFields();
        }

        modal.classList.add('active');
    }

    openSessionModal(sessionId = null) {
        this.editingSession = sessionId;
        const modal = document.getElementById('sessionModal');
        const title = document.getElementById('sessionModalTitle');
        const form = document.getElementById('sessionForm');
        form.reset();

        this.updateSessionCoacheeDropdown();

        if (sessionId) {
            title.textContent = 'Edit Session';
            const session = this.getSession(sessionId);
            this.populateSessionForm(session);
        } else {
            title.textContent = 'Add Session';
            document.querySelector('input[name="sessionCoacheeType"][value="Individual"]').checked = true;
            this.updateSessionCoacheeDropdown();
        }

        modal.classList.add('active');
    }

    openSourceModal(sourceId = null) {
        this.editingSource = sourceId;
        const modal = document.getElementById('sourceModal');
        const title = document.getElementById('sourceModalTitle');
        const form = document.getElementById('sourceForm');
        form.reset();

        if (sourceId) {
            title.textContent = 'Edit Source';
            const source = this.getSource(sourceId);
            document.getElementById('sourceName').value = source.name;
            document.getElementById('sourceCountry').value = source.country;
            document.getElementById('sourceWebsite').value = source.website;
        } else {
            title.textContent = 'Add Source';
        }

        modal.classList.add('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.editingCoachee = null;
        this.editingSession = null;
        this.editingSource = null;
    }

    toggleCoacheeFields() {
        const type = document.querySelector('input[name="coacheeType"]:checked').value;
        const individualFields = document.getElementById('individualFields');
        const groupTeamFields = document.getElementById('groupTeamFields');

        if (type === 'Individual') {
            individualFields.style.display = 'block';
            groupTeamFields.style.display = 'none';
            // Set required
            document.getElementById('firstName').required = true;
            document.getElementById('ageGroup').required = true;
            document.getElementById('sex').required = true;
            document.getElementById('occupation').required = true;
            document.getElementById('groupTeamName').required = false;
            document.getElementById('numParticipants').required = false;
        } else {
            individualFields.style.display = 'none';
            groupTeamFields.style.display = 'block';
            // Set required
            document.getElementById('firstName').required = false;
            document.getElementById('ageGroup').required = false;
            document.getElementById('sex').required = false;
            document.getElementById('occupation').required = false;
            document.getElementById('groupTeamName').required = true;
            document.getElementById('numParticipants').required = true;
        }
    }

    populateCoacheeForm(coachee) {
        document.querySelector(`input[name="coacheeType"][value="${coachee.type}"]`).checked = true;
        this.toggleCoacheeFields();

        if (coachee.type === 'Individual') {
            document.getElementById('firstName').value = coachee.firstName || '';
            document.getElementById('secondName').value = coachee.secondName || '';
            document.getElementById('ageGroup').value = coachee.ageGroup || '';
            document.getElementById('sex').value = coachee.sex || '';
            document.getElementById('email').value = coachee.email || '';
            document.getElementById('phone').value = coachee.phone || '';
            document.getElementById('linkedin').value = coachee.linkedin || '';
            document.getElementById('occupation').value = coachee.occupation || '';
        } else {
            document.getElementById('groupTeamName').value = coachee.groupTeamName || '';
            document.getElementById('numParticipants').value = coachee.numParticipants || '';
            document.getElementById('members').value = coachee.members || '';
        }

        document.getElementById('organisation').value = coachee.organisation || '';
        document.getElementById('city').value = coachee.city || '';
        document.getElementById('country').value = coachee.country || '';
        document.getElementById('source').value = coachee.sourceId || '';
    }

    populateSessionForm(session) {
        const coachee = this.getCoachee(session.coacheeId);
        document.querySelector(`input[name="sessionCoacheeType"][value="${coachee.type}"]`).checked = true;
        this.updateSessionCoacheeDropdown();

        document.getElementById('sessionCoacheeName').value = session.coacheeId;
        document.getElementById('sessionDate').value = session.sessionDate;
        document.getElementById('duration').value = session.duration;
        document.getElementById('paymentType').value = session.paymentType;
        document.getElementById('sessionNotes').value = session.notes || '';

        // Set themes
        const themes = Array.isArray(session.theme) ? session.theme : [session.theme];
        document.querySelectorAll('input[name="theme"]').forEach(checkbox => {
            checkbox.checked = themes.includes(checkbox.value);
        });
    }

    updateSessionCoacheeDropdown() {
        const type = document.querySelector('input[name="sessionCoacheeType"]:checked').value;
        const dropdown = document.getElementById('sessionCoacheeName');
        const coachees = this.getCoacheesByType(type);

        const options = coachees.map(c => 
            `<option value="${c.id}">${this.getCoacheeName(c)}</option>`
        ).join('');

        dropdown.innerHTML = '<option value="">Select a coachee...</option>' + options;
    }

    saveCoachee(addAnother = false) {
        const type = document.querySelector('input[name="coacheeType"]:checked').value;
        
        let data = {
            type,
            organisation: document.getElementById('organisation').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            sourceId: document.getElementById('source').value || null
        };

        if (type === 'Individual') {
            data.firstName = document.getElementById('firstName').value;
            data.secondName = document.getElementById('secondName').value;
            data.ageGroup = document.getElementById('ageGroup').value;
            data.sex = document.getElementById('sex').value;
            data.email = document.getElementById('email').value;
            data.phone = document.getElementById('phone').value;
            data.linkedin = document.getElementById('linkedin').value;
            data.occupation = document.getElementById('occupation').value;
        } else {
            data.groupTeamName = document.getElementById('groupTeamName').value;
            data.numParticipants = parseInt(document.getElementById('numParticipants').value);
            data.members = document.getElementById('members').value;
        }

        if (this.editingCoachee) {
            this.updateCoachee(this.editingCoachee, data);
            this.showToast('Coachee updated successfully!');
        } else {
            this.addCoachee(data);
            this.showToast('Coachee added successfully!');
        }

        this.refreshAllData();

        if (addAnother) {
            document.getElementById('coacheeForm').reset();
            this.toggleCoacheeFields();
        } else {
            this.closeAllModals();
        }
    }

    saveSession(addAnother = false) {
        const coacheeId = document.getElementById('sessionCoacheeName').value;
        if (!coacheeId) {
            this.showToast('Please select a coachee', 'error');
            return;
        }

        const themes = Array.from(document.querySelectorAll('input[name="theme"]:checked')).map(cb => cb.value);
        if (themes.length === 0) {
            this.showToast('Please select at least one theme', 'error');
            return;
        }

        const data = {
            coacheeId,
            sessionDate: document.getElementById('sessionDate').value,
            duration: document.getElementById('duration').value,
            theme: themes,
            paymentType: document.getElementById('paymentType').value,
            notes: document.getElementById('sessionNotes').value
        };

        if (this.editingSession) {
            this.updateSession(this.editingSession, data);
            this.showToast('Session updated successfully!');
        } else {
            this.addSession(data);
            this.showToast('Session added successfully!');
        }

        this.refreshAllData();

        if (addAnother) {
            document.getElementById('sessionForm').reset();
            this.updateSessionCoacheeDropdown();
        } else {
            this.closeAllModals();
        }
    }

    saveSource() {
        const data = {
            name: document.getElementById('sourceName').value,
            country: document.getElementById('sourceCountry').value,
            website: document.getElementById('sourceWebsite').value
        };

        if (this.editingSource) {
            this.updateSource(this.editingSource, data);
            this.showToast('Source updated successfully!');
        } else {
            const result = this.addSource(data);
            if (result) {
                this.showToast('Source added successfully!');
            } else {
                return; // Error already shown
            }
        }

        this.refreshAllData();
        this.closeAllModals();
    }

    // ==================== PUBLIC METHODS FOR UI ====================

    editCoachee(id) {
        this.openCoacheeModal(id);
    }

    removeCoachee(id) {
        if (this.deleteCoachee(id)) {
            this.showToast('Coachee deleted successfully!');
            this.refreshAllData();
        }
    }

    editSession(id) {
        this.openSessionModal(id);
    }

    removeSession(id) {
        if (this.deleteSession(id)) {
            this.showToast('Session deleted successfully!');
            this.refreshAllData();
        }
    }

    editSource(id) {
        this.openSourceModal(id);
    }

    removeSource(id) {
        if (this.deleteSource(id)) {
            this.showToast('Source deleted successfully!');
            this.refreshAllData();
        }
    }

    // ==================== LOOKUP FUNCTIONALITY ====================

    updateLookupDropdowns() {
        this.updateLookupCoacheeDropdown();
        this.updateLookupOrganisationDropdown();
        this.updateLookupSourceDropdown();
    }

    updateLookupCoacheeDropdown() {
        const typeFilter = document.getElementById('lookupCoacheeType').value;
        const dropdown = document.getElementById('lookupCoacheeName');
        const coachees = this.getCoacheesByType(typeFilter);

        const options = coachees.map(c => 
            `<option value="${c.id}">${this.getCoacheeName(c)}</option>`
        ).join('');

        dropdown.innerHTML = '<option value="">Select a coachee...</option>' + options;
        
        // Clear details
        document.getElementById('coacheeDetails').innerHTML = '';
        document.getElementById('coacheeSessions').innerHTML = '';
    }

    updateLookupOrganisationDropdown() {
        const dropdown = document.getElementById('lookupOrganisationName');
        const organisations = [...new Set(this.coachees.map(c => c.organisation).filter(o => o))];

        const options = organisations.map(org => 
            `<option value="${org}">${org}</option>`
        ).join('');

        dropdown.innerHTML = '<option value="">Select an organisation...</option>' + options;
        
        // Clear details
        document.getElementById('organisationDetails').innerHTML = '';
        document.getElementById('organisationCoachees').innerHTML = '';
    }

    updateLookupSourceDropdown() {
        const dropdown = document.getElementById('lookupSourceName');
        const options = this.sources.map(s => 
            `<option value="${s.id}">${s.name}</option>`
        ).join('');

        dropdown.innerHTML = '<option value="">Select a source...</option>' + options;
        
        // Clear details
        document.getElementById('sourceDetails').innerHTML = '';
        document.getElementById('sourceOrganisations').innerHTML = '';
    }

    displayCoacheeDetails(coacheeId) {
        const coachee = this.getCoachee(coacheeId);
        const stats = this.getCoacheeStats(coacheeId);
        const sourceName = coachee.sourceId ? (this.getSource(coachee.sourceId)?.name || '') : 'N/A';

        let detailsHtml = `
            <h3>${this.getCoacheeName(coachee)}</h3>
            <div class="detail-row">
                <div class="detail-label">Type:</div>
                <div class="detail-value">${coachee.type}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Organisation:</div>
                <div class="detail-value">${coachee.organisation || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">City:</div>
                <div class="detail-value">${coachee.city || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Country:</div>
                <div class="detail-value">${coachee.country || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Source:</div>
                <div class="detail-value">${sourceName}</div>
            </div>
        `;

        if (coachee.type === 'Individual') {
            detailsHtml += `
                <div class="detail-row">
                    <div class="detail-label">Age Group:</div>
                    <div class="detail-value">${coachee.ageGroup || 'N/A'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Sex:</div>
                    <div class="detail-value">${coachee.sex || 'N/A'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Email:</div>
                    <div class="detail-value">${coachee.email || 'N/A'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Phone:</div>
                    <div class="detail-value">${coachee.phone || 'N/A'}</div>
                </div>
            `;
        }

        detailsHtml += `
            <h4 style="margin-top: 20px;">Key Metrics</h4>
            <div class="detail-row">
                <div class="detail-label">Total Sessions:</div>
                <div class="detail-value"><strong>${stats.totalSessions}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Total Hours:</div>
                <div class="detail-value"><strong>${stats.totalHours}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Engagement Period:</div>
                <div class="detail-value">${stats.engagementDays} days</div>
            </div>
        `;

        document.getElementById('coacheeDetails').innerHTML = detailsHtml;

        // Show sessions table
        const sessions = this.getSessionsForCoachee(coacheeId);
        const sessionsHtml = `
            <h4>Sessions</h4>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Duration (hrs)</th>
                        <th>Theme(s)</th>
                        <th>Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${sessions.map(s => `
                        <tr>
                            <td>${this.formatDate(s.sessionDate)}</td>
                            <td>${s.duration}</td>
                            <td>${Array.isArray(s.theme) ? s.theme.join(', ') : s.theme}</td>
                            <td>${s.paymentType}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        document.getElementById('coacheeSessions').innerHTML = sessionsHtml;
    }

    displayOrganisationDetails(orgName) {
        const stats = this.getOrganisationStats(orgName);

        const detailsHtml = `
            <h3>${orgName}</h3>
            <h4 style="margin-top: 20px;">Metrics</h4>
            <div class="detail-row">
                <div class="detail-label">Number of Coachees:</div>
                <div class="detail-value"><strong>${stats.coacheeCount}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Total Sessions:</div>
                <div class="detail-value"><strong>${stats.sessionCount}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Sources:</div>
                <div class="detail-value">${stats.sources.join(', ') || 'N/A'}</div>
            </div>
        `;
        document.getElementById('organisationDetails').innerHTML = detailsHtml;

        // Show coachees table
        const coacheesHtml = `
            <h4>Coachees</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Source</th>
                        <th>Total Sessions</th>
                        <th>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    ${stats.coachees.map(c => {
                        const coacheeStats = this.getCoacheeStats(c.id);
                        const sourceName = c.sourceId ? (this.getSource(c.sourceId)?.name || '') : '';
                        return `
                            <tr>
                                <td>${this.getCoacheeName(c)}</td>
                                <td>${c.type}</td>
                                <td>${sourceName}</td>
                                <td>${coacheeStats.totalSessions}</td>
                                <td>${coacheeStats.totalHours}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
        document.getElementById('organisationCoachees').innerHTML = coacheesHtml;
    }

    displaySourceDetails(sourceId) {
        const source = this.getSource(sourceId);
        const stats = this.getSourceStats(sourceId);

        const detailsHtml = `
            <h3>${source.name}</h3>
            <div class="detail-row">
                <div class="detail-label">Country:</div>
                <div class="detail-value">${source.country || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Website:</div>
                <div class="detail-value">${source.website ? `<a href="${source.website}" target="_blank">${source.website}</a>` : 'N/A'}</div>
            </div>
            <h4 style="margin-top: 20px;">Metrics</h4>
            <div class="detail-row">
                <div class="detail-label">Total Coachees:</div>
                <div class="detail-value"><strong>${stats.coacheeCount}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Total Sessions:</div>
                <div class="detail-value"><strong>${stats.sessionCount}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Organisations:</div>
                <div class="detail-value">${stats.organisations.join(', ') || 'N/A'}</div>
            </div>
        `;
        document.getElementById('sourceDetails').innerHTML = detailsHtml;

        // Show organisations table
        const orgStats = {};
        stats.coachees.forEach(c => {
            if (c.organisation) {
                if (!orgStats[c.organisation]) {
                    orgStats[c.organisation] = { coachees: 0, sessions: 0 };
                }
                orgStats[c.organisation].coachees++;
                orgStats[c.organisation].sessions += this.getSessionsForCoachee(c.id).length;
            }
        });

        const orgsHtml = `
            <h4>Organisations</h4>
            <table>
                <thead>
                    <tr>
                        <th>Organisation Name</th>
                        <th>Number of Coachees</th>
                        <th>Number of Sessions</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(orgStats).map(([name, data]) => `
                        <tr>
                            <td>${name}</td>
                            <td>${data.coachees}</td>
                            <td>${data.sessions}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        document.getElementById('sourceOrganisations').innerHTML = orgsHtml || '<p>No organisations</p>';
    }

    updateSourceDropdowns() {
        // Update source dropdown in coachee form
        const sourceSelect = document.getElementById('source');
        const options = this.sources.map(s => 
            `<option value="${s.id}">${s.name}</option>`
        ).join('');
        sourceSelect.innerHTML = '<option value="">Select...</option>' + options;
    }

    updateOrganisationAutocomplete() {
        // Update organisation datalist
        const datalist = document.getElementById('organisationList');
        const organisations = [...new Set(this.coachees.map(c => c.organisation).filter(o => o))];
        const options = organisations.map(org => `<option value="${org}">`).join('');
        datalist.innerHTML = options;
    }
}

// Initialize the app
const app = new CoachingTracker();
