// Seed script to insert Excel data into Railway PostgreSQL
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const coachees = [
    { id: "cp_001", type: "Individual", firstName: "Vihaan", secondName: "Khan", ageGroup: "30-40", sex: "Male", email: "vihaan.khan@example.com", phone: "+91-9876543001", occupation: "Employed", organisation: "Tech Corp", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_002", type: "Individual", firstName: "Sai", secondName: "Patil", ageGroup: "20-30", sex: "Female", email: "sai.patil@example.com", phone: "+91-9876543002", occupation: "Self-employed", organisation: "Consulting", city: "Pune", country: "India", sourceId: null },
    { id: "cp_003", type: "Individual", firstName: "Emily", secondName: "Davis", ageGroup: "30-40", sex: "Female", email: "emily.davis@example.com", phone: "+91-9876543003", occupation: "Employed", organisation: "Global Inc", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_004", type: "Individual", firstName: "Ava", secondName: "Rodriguez", ageGroup: "20-30", sex: "Female", email: "ava.rodriguez@example.com", phone: "+91-9876543004", occupation: "Employed", organisation: "StartUp Ltd", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_005", type: "Individual", firstName: "Sai", secondName: "Gupta", ageGroup: "30-40", sex: "Male", email: "sai.gupta@example.com", phone: "+91-9876543005", occupation: "Employed", organisation: "Tech Solutions", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_006", type: "Individual", firstName: "Sai", secondName: "Verma", ageGroup: "40-50", sex: "Male", email: "sai.verma@example.com", phone: "+91-9876543006", occupation: "Employed", organisation: "Corp Solutions", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_007", type: "Individual", firstName: "Anaya", secondName: "Davis", ageGroup: "20-30", sex: "Female", email: "anaya.davis@example.com", phone: "+91-9876543007", occupation: "Self-employed", organisation: "Creative Works", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_008", type: "Individual", firstName: "Mason", secondName: "Agarwal", ageGroup: "30-40", sex: "Male", email: "mason.agarwal@example.com", phone: "+91-9876543008", occupation: "Employed", organisation: "Finance Corp", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_009", type: "Individual", firstName: "Aarav", secondName: "Hernandez", ageGroup: "20-30", sex: "Male", email: "aarav.hernandez@example.com", phone: "+91-9876543009", occupation: "Employed", organisation: "Digital Services", city: "Pune", country: "India", sourceId: null },
    { id: "cp_010", type: "Individual", firstName: "Aadhya", secondName: "Rodriguez", ageGroup: "30-40", sex: "Female", email: "aadhya.rodriguez@example.com", phone: "+91-9876543010", occupation: "Employed", organisation: "Media Group", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_011", type: "Individual", firstName: "David", secondName: "Martinez", ageGroup: "40-50", sex: "Male", email: "david.martinez@example.com", phone: "+91-9876543011", occupation: "Employed", organisation: "Consulting Firm", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_012", type: "Individual", firstName: "Zoe", secondName: "Sharma", ageGroup: "20-30", sex: "Female", email: "zoe.sharma@example.com", phone: "+91-9876543012", occupation: "Self-employed", organisation: "Design Studio", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_013", type: "Individual", firstName: "Sai", secondName: "Kulkarni", ageGroup: "30-40", sex: "Male", email: "sai.kulkarni@example.com", phone: "+91-9876543013", occupation: "Employed", organisation: "IT Services", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_014", type: "Individual", firstName: "Vivaan", secondName: "Sharma", ageGroup: "20-30", sex: "Male", email: "vivaan.sharma@example.com", phone: "+91-9876543014", occupation: "Employed", organisation: "Software Tech", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_015", type: "Individual", firstName: "Lucas", secondName: "Brown", ageGroup: "30-40", sex: "Male", email: "lucas.brown@example.com", phone: "+91-9876543015", occupation: "Employed", organisation: "Enterprise Ltd", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_016", type: "Individual", firstName: "Zoe", secondName: "Williams", ageGroup: "20-30", sex: "Female", email: "zoe.williams@example.com", phone: "+91-9876543016", occupation: "Self-employed", organisation: "Marketing Agency", city: "Pune", country: "India", sourceId: null },
    { id: "cp_017", type: "Individual", firstName: "Liam", secondName: "Garcia", ageGroup: "30-40", sex: "Male", email: "liam.garcia@example.com", phone: "+91-9876543017", occupation: "Employed", organisation: "Business Corp", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_018", type: "Individual", firstName: "Sara", secondName: "Jones", ageGroup: "20-30", sex: "Female", email: "sara.jones@example.com", phone: "+91-9876543018", occupation: "Employed", organisation: "Tech Innovators", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_019", type: "Individual", firstName: "Arjun", secondName: "Iyer", ageGroup: "30-40", sex: "Male", email: "arjun.iyer@example.com", phone: "+91-9876543019", occupation: "Employed", organisation: "Systems Inc", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_020", type: "Individual", firstName: "Emma", secondName: "Verma", ageGroup: "20-30", sex: "Female", email: "emma.verma@example.com", phone: "+91-9876543020", occupation: "Self-employed", organisation: "Coaching Center", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_021", type: "Individual", firstName: "Reyansh", secondName: "Garcia", ageGroup: "30-40", sex: "Male", email: "reyansh.garcia@example.com", phone: "+91-9876543021", occupation: "Employed", organisation: "Data Analytics", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_022", type: "Individual", firstName: "Mason", secondName: "Verma", ageGroup: "20-30", sex: "Male", email: "mason.verma@example.com", phone: "+91-9876543022", occupation: "Employed", organisation: "Cloud Tech", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_023", type: "Individual", firstName: "Diya", secondName: "Brown", ageGroup: "30-40", sex: "Female", email: "diya.brown@example.com", phone: "+91-9876543023", occupation: "Employed", organisation: "E-Learning", city: "Pune", country: "India", sourceId: null },
    { id: "cp_024", type: "Individual", firstName: "Lucas", secondName: "Kulkarni", ageGroup: "20-30", sex: "Male", email: "lucas.kulkarni@example.com", phone: "+91-9876543024", occupation: "Self-employed", organisation: "Freelance", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_025", type: "Individual", firstName: "James", secondName: "Hernandez", ageGroup: "40-50", sex: "Male", email: "james.hernandez@example.com", phone: "+91-9876543025", occupation: "Employed", organisation: "Corporate Ltd", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_026", type: "Individual", firstName: "Aadhya", secondName: "Kulkarni", ageGroup: "20-30", sex: "Female", email: "aadhya.kulkarni@example.com", phone: "+91-9876543026", occupation: "Employed", organisation: "StartUp Hub", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_027", type: "Individual", firstName: "Aadhya", secondName: "Agarwal", ageGroup: "30-40", sex: "Female", email: "aadhya.agarwal@example.com", phone: "+91-9876543027", occupation: "Employed", organisation: "Trade Services", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_028", type: "Individual", firstName: "David", secondName: "Garcia", ageGroup: "20-30", sex: "Male", email: "david.garcia@example.com", phone: "+91-9876543028", occupation: "Self-employed", organisation: "Consultancy", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_029", type: "Individual", firstName: "Amelia", secondName: "Agarwal", ageGroup: "30-40", sex: "Female", email: "amelia.agarwal@example.com", phone: "+91-9876543029", occupation: "Employed", organisation: "Retail Corp", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_030", type: "Individual", firstName: "Sophia", secondName: "Brown", ageGroup: "20-30", sex: "Female", email: "sophia.brown@example.com", phone: "+91-9876543030", occupation: "Employed", organisation: "Health Tech", city: "Pune", country: "India", sourceId: null },
    { id: "cp_031", type: "Individual", firstName: "Lucas", secondName: "Garcia", ageGroup: "30-40", sex: "Male", email: "lucas.garcia@example.com", phone: "+91-9876543031", occupation: "Employed", organisation: "Logistics Co", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_032", type: "Individual", firstName: "Emma", secondName: "Agarwal", ageGroup: "20-30", sex: "Female", email: "emma.agarwal@example.com", phone: "+91-9876543032", occupation: "Self-employed", organisation: "Beauty Salon", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_033", type: "Individual", firstName: "Reyansh", secondName: "Hernandez", ageGroup: "30-40", sex: "Male", email: "reyansh.hernandez@example.com", phone: "+91-9876543033", occupation: "Employed", organisation: "Manufacturing", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_034", type: "Individual", firstName: "Isabella", secondName: "Gupta", ageGroup: "20-30", sex: "Female", email: "isabella.gupta@example.com", phone: "+91-9876543034", occupation: "Employed", organisation: "Fashion House", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_035", type: "Individual", firstName: "Chloe", secondName: "Garcia", ageGroup: "30-40", sex: "Female", email: "chloe.garcia@example.com", phone: "+91-9876543035", occupation: "Employed", organisation: "Education Inst", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_036", type: "Individual", firstName: "Anaya", secondName: "Garcia", ageGroup: "20-30", sex: "Female", email: "anaya.garcia@example.com", phone: "+91-9876543036", occupation: "Self-employed", organisation: "Event Mgmt", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_037", type: "Individual", firstName: "Emily", secondName: "Kulkarni", ageGroup: "30-40", sex: "Female", email: "emily.kulkarni@example.com", phone: "+91-9876543037", occupation: "Employed", organisation: "Real Estate", city: "Pune", country: "India", sourceId: null },
    { id: "cp_038", type: "Individual", firstName: "Aarav", secondName: "Gupta", ageGroup: "20-30", sex: "Male", email: "aarav.gupta@example.com", phone: "+91-9876543038", occupation: "Employed", organisation: "Finance Tech", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_039", type: "Individual", firstName: "Myra", secondName: "Johnson", ageGroup: "30-40", sex: "Female", email: "myra.johnson@example.com", phone: "+91-9876543039", occupation: "Employed", organisation: "Hospitality", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_040", type: "Individual", firstName: "Noah", secondName: "Deshpande", ageGroup: "20-30", sex: "Male", email: "noah.deshpande@example.com", phone: "+91-9876543040", occupation: "Self-employed", organisation: "Food Services", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_041", type: "Individual", firstName: "Aarohi", secondName: "Sharma", ageGroup: "30-40", sex: "Female", email: "aarohi.sharma@example.com", phone: "+91-9876543041", occupation: "Employed", organisation: "Travel Agency", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_042", type: "Individual", firstName: "Navya", secondName: "Gupta", ageGroup: "20-30", sex: "Female", email: "navya.gupta@example.com", phone: "+91-9876543042", occupation: "Employed", organisation: "NGO", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_043", type: "Individual", firstName: "Arjun", secondName: "Davis", ageGroup: "30-40", sex: "Male", email: "arjun.davis@example.com", phone: "+91-9876543043", occupation: "Employed", organisation: "Media Prod", city: "Mumbai", country: "India", sourceId: null },
    { id: "cp_044", type: "Individual", firstName: "Arjun", secondName: "Johnson", ageGroup: "20-30", sex: "Male", email: "arjun.johnson@example.com", phone: "+91-9876543044", occupation: "Self-employed", organisation: "Photography", city: "Pune", country: "India", sourceId: null },
    { id: "cp_045", type: "Individual", firstName: "Aarohi", secondName: "Garcia", ageGroup: "30-40", sex: "Female", email: "aarohi.garcia@example.com", phone: "+91-9876543045", occupation: "Employed", organisation: "Legal Firm", city: "Delhi", country: "India", sourceId: null },
    { id: "cp_046", type: "Individual", firstName: "Ira", secondName: "Iyer", ageGroup: "20-30", sex: "Female", email: "ira.iyer@example.com", phone: "+91-9876543046", occupation: "Employed", organisation: "HR Services", city: "Bengaluru", country: "India", sourceId: null },
    { id: "cp_047", type: "Individual", firstName: "Vihaan", secondName: "Miller", ageGroup: "30-40", sex: "Male", email: "vihaan.miller@example.com", phone: "+91-9876543047", occupation: "Employed", organisation: "Auto Corp", city: "Hyderabad", country: "India", sourceId: null },
    { id: "cp_048", type: "Individual", firstName: "Ethan", secondName: "Kulkarni", ageGroup: "20-30", sex: "Male", email: "ethan.kulkarni@example.com", phone: "+91-9876543048", occupation: "Self-employed", organisation: "Tech Repair", city: "Chennai", country: "India", sourceId: null },
    { id: "cp_049", type: "Individual", firstName: "Daniel", secondName: "Martinez", ageGroup: "40-50", sex: "Male", email: "daniel.martinez@example.com", phone: "+91-9876543049", occupation: "Employed", organisation: "Security Co", city: "Kolkata", country: "India", sourceId: null },
    { id: "cp_050", type: "Individual", firstName: "Aarohi", secondName: "Sharma", ageGroup: "30-40", sex: "Female", email: "aarohi.sharma2@example.com", phone: "+91-9876543050", occupation: "Employed", organisation: "Wellness Center", city: "Mumbai", country: "India", sourceId: null }
];

const sources = [
    { id: "src_001", name: "Company A", country: "India", website: "https://companya.com" },
    { id: "src_002", name: "Company B", country: "India", website: "https://companyb.com" },
    { id: "src_003", name: "Company C", country: "USA", website: "https://companyc.com" },
    { id: "src_004", name: "Direct", country: "India", website: "" },
    { id: "src_005", name: "Referral", country: "India", website: "" }
];

async function seed() {
    try {
        console.log('Connecting to Railway database...');
        
        // Create sources first
        console.log('Creating sources...');
        for (const source of sources) {
            await pool.query(
                `INSERT INTO sources (id, name, country, website, created_on, last_updated) 
                 VALUES ($1, $2, $3, $4, NOW(), NOW())
                 ON CONFLICT (id) DO NOTHING`,
                [source.id, source.name, source.country, source.website]
            );
        }
        console.log('Sources created!');
        
        // Get source IDs
        const sourceResult = await pool.query('SELECT id, name FROM sources');
        const sourceMap = {};
        sourceResult.rows.forEach(row => {
            sourceMap[row.name] = row.id;
        });
        
        console.log('Creating coachees...');
        for (const coachee of coachees) {
            // Assign a random source
            const sourceKeys = Object.keys(sourceMap);
            const randomSource = sourceKeys[Math.floor(Math.random() * sourceKeys.length)];
            const sourceId = sourceMap[randomSource];
            
            await pool.query(
                `INSERT INTO coachees (id, type, first_name, second_name, age_group, sex, email, phone, occupation, organisation, city, country, source_id, created_on, last_updated) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
                 ON CONFLICT (id) DO NOTHING`,
                [coachee.id, coachee.type, coachee.firstName, coachee.secondName, coachee.ageGroup, coachee.sex, coachee.email, coachee.phone, coachee.occupation, coachee.organisation, coachee.city, coachee.country, sourceId]
            );
        }
        console.log('Coachees created!');
        
        // Verify counts
        const coacheeCount = await pool.query('SELECT COUNT(*) FROM coachees');
        const sourceCount = await pool.query('SELECT COUNT(*) FROM sources');
        
        console.log(`\n✅ Seeding complete!`);
        console.log(`   Sources: ${sourceCount.rows[0].count}`);
        console.log(`   Coachees: ${coacheeCount.rows[0].count}`);
        
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await pool.end();
    }
}

seed();
