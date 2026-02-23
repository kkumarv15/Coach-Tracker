const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'coaching_tracker'
});

const query = (text, params = []) => pool.query(text, params);

// Client prospects data extracted from Excel file
const clientProspectsData = [
    {
        id: 'cp_001',
        client_name: 'Vihaan Khan',
        gender: 'M',
        age_group: '>51',
        city: 'Nagpur',
        country: 'India',
        role: 'VP Engineering',
        company: 'BlueSky Solutions',
        industry_sector: 'Education',
        linkedin_link: 'https://www.linkedin.com/in/vihaan-khan-vp-engineering-tl4f',
        source: 'company A',
        mobile: '+91 57197 83071',
        email: 'vihaankhan@example.com'
    },
    {
        id: 'cp_002',
        client_name: 'Sai Patil',
        gender: 'M',
        age_group: '20-30',
        city: 'Nashik',
        country: 'India',
        role: 'Sales Manager',
        company: 'Maple Cloud',
        industry_sector: 'Telecommunications',
        linkedin_link: 'https://www.linkedin.com/in/sai-patil-sales-manager-j41m',
        source: 'company B',
        mobile: '+91 26583 37566',
        email: 'saipatil@sample.org'
    },
    {
        id: 'cp_003',
        client_name: 'Emily Davis',
        gender: 'F',
        age_group: '41-50',
        city: 'Manchester',
        country: 'UK',
        role: 'CTO',
        company: 'Sunrise Ventures',
        industry_sector: 'Pharmaceuticals',
        linkedin_link: 'https://www.linkedin.com/in/emily-davis-cto-36xg',
        source: 'company A',
        mobile: '+44 58737 05838',
        email: 'emilydavis@mailinator.com'
    },
    {
        id: 'cp_004',
        client_name: 'Ava Rodriguez',
        gender: 'M',
        age_group: '41-50',
        city: 'London',
        country: 'UK',
        role: 'Project Manager',
        company: 'Zenith Retail',
        industry_sector: 'Telecommunications',
        linkedin_link: 'https://www.linkedin.com/in/ava-rodriguez-project-manager-9ftn',
        source: 'company B',
        mobile: '+44 01123 24410',
        email: 'avarodriguez@testmail.com'
    },
    {
        id: 'cp_005',
        client_name: 'Sai Gupta',
        gender: 'F',
        age_group: '20-30',
        city: 'Dublin',
        country: 'Ireland',
        role: 'Operations Manager',
        company: 'GreenLeaf Corp',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/sai-gupta-operations-manager-yo9j',
        source: 'company B',
        mobile: '+353 05406 19081',
        email: 'saigupta@mailinator.com'
    },
    {
        id: 'cp_006',
        client_name: 'Sai Verma',
        gender: 'F',
        age_group: '41-50',
        city: 'Delhi',
        country: 'India',
        role: 'Software Engineer',
        company: 'BrightPath',
        industry_sector: 'Logistics',
        linkedin_link: 'https://www.linkedin.com/in/sai-verma-software-engineer-e9sw',
        source: 'company C',
        mobile: '+91 30163 87963',
        email: 'saiverma@example.com'
    },
    {
        id: 'cp_007',
        client_name: 'Anaya Davis',
        gender: 'F',
        age_group: '31-40',
        city: 'New York',
        country: 'USA',
        role: 'Design Lead',
        company: 'Nimbus Systems',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/anaya-davis-design-lead-0iud',
        source: 'company C',
        mobile: '+1 28205 95780',
        email: 'anayadavis@testmail.com'
    },
    {
        id: 'cp_008',
        client_name: 'Mason Agarwal',
        gender: 'M',
        age_group: '41-50',
        city: 'Bengaluru',
        country: 'India',
        role: 'Business Analyst',
        company: 'Zenith Retail',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/mason-agarwal-business-analyst-e67e',
        source: 'company B',
        mobile: '+91 43078 83989',
        email: 'masonagarwal@sample.org'
    },
    {
        id: 'cp_009',
        client_name: 'Aarav Hernandez',
        gender: 'F',
        age_group: '41-50',
        city: 'Singapore',
        country: 'Singapore',
        role: 'DevOps Engineer',
        company: 'Nimbus Systems',
        industry_sector: 'Pharmaceuticals',
        linkedin_link: 'https://www.linkedin.com/in/aarav-hernandez-devops-engineer-b5ny',
        source: 'company B',
        mobile: '+65 32481 93883',
        email: 'aaravhernandez@testmail.com'
    },
    {
        id: 'cp_010',
        client_name: 'Aadhya Rodriguez',
        gender: 'F',
        age_group: '41-50',
        city: 'Bengaluru',
        country: 'India',
        role: 'Software Engineer',
        company: 'Nimbus Systems',
        industry_sector: 'Real Estate',
        linkedin_link: 'https://www.linkedin.com/in/aadhya-rodriguez-software-engineer-j3l7',
        source: 'direct',
        mobile: '+91 52477 24853',
        email: 'aadhyarodriguez@dummy.io'
    },
    {
        id: 'cp_011',
        client_name: 'David Martinez',
        gender: 'F',
        age_group: '41-50',
        city: 'Mumbai',
        country: 'India',
        role: 'Director of Marketing',
        company: 'Nimbus Systems',
        industry_sector: 'Information Technology',
        linkedin_link: 'https://www.linkedin.com/in/david-martinez-director-of-marketing-pret',
        source: 'company B',
        mobile: '+91 91882 84887',
        email: 'davidmartinez@testmail.com'
    },
    {
        id: 'cp_012',
        client_name: 'Zoe Sharma',
        gender: 'F',
        age_group: '>51',
        city: 'Ahmedabad',
        country: 'India',
        role: 'CFO',
        company: 'Silverline Associates',
        industry_sector: 'Manufacturing',
        linkedin_link: 'https://www.linkedin.com/in/zoe-sharma-cfo-gopv',
        source: 'company B',
        mobile: '+91 61217 51482',
        email: 'zoesharma@sample.org'
    },
    {
        id: 'cp_013',
        client_name: 'Sai Kulkarni',
        gender: 'F',
        age_group: '41-50',
        city: 'Kolkata',
        country: 'India',
        role: 'Design Lead',
        company: 'GreenLeaf Corp',
        industry_sector: 'E-commerce',
        linkedin_link: 'https://www.linkedin.com/in/sai-kulkarni-design-lead-7o2d',
        source: 'company C',
        mobile: '+91 46511 99922',
        email: 'saikulkarni@dummy.io'
    },
    {
        id: 'cp_014',
        client_name: 'Vivaan Sharma',
        gender: 'F',
        age_group: '41-50',
        city: 'Dublin',
        country: 'Ireland',
        role: 'CEO',
        company: 'BlueSky Solutions',
        industry_sector: 'Real Estate',
        linkedin_link: 'https://www.linkedin.com/in/vivaan-sharma-ceo-705p',
        source: 'company A',
        mobile: '+353 93263 57744',
        email: 'vivaansharma@sample.org'
    },
    {
        id: 'cp_015',
        client_name: 'Lucas Brown',
        gender: 'M',
        age_group: '>51',
        city: 'Bengaluru',
        country: 'India',
        role: 'Account Manager',
        company: 'BlueSky Solutions',
        industry_sector: 'Manufacturing',
        linkedin_link: 'https://www.linkedin.com/in/lucas-brown-account-manager-f06e',
        source: 'company B',
        mobile: '+91 93643 33058',
        email: 'lucasbrown@example.com'
    },
    {
        id: 'cp_016',
        client_name: 'Zoe Williams',
        gender: 'M',
        age_group: '31-40',
        city: 'Austin',
        country: 'USA',
        role: 'Director of Marketing',
        company: 'Aurora Group',
        industry_sector: 'Healthcare',
        linkedin_link: 'https://www.linkedin.com/in/zoe-williams-director-of-marketing-5f5f',
        source: 'direct',
        mobile: '+1 30242 40161',
        email: 'zoewilliams@example.com'
    },
    {
        id: 'cp_017',
        client_name: 'Liam Garcia',
        gender: 'M',
        age_group: '31-40',
        city: 'Ahmedabad',
        country: 'India',
        role: 'Sales Manager',
        company: 'Vertex Labs',
        industry_sector: 'E-commerce',
        linkedin_link: 'https://www.linkedin.com/in/liam-garcia-sales-manager-fyky',
        source: 'company A',
        mobile: '+91 78009 21776',
        email: 'liamgarcia@sample.org'
    },
    {
        id: 'cp_018',
        client_name: 'Sara Jones',
        gender: 'F',
        age_group: '41-50',
        city: 'Sydney',
        country: 'Australia',
        role: 'VP Sales',
        company: 'Aurora Group',
        industry_sector: 'Real Estate',
        linkedin_link: 'https://www.linkedin.com/in/sara-jones-vp-sales-bkl4',
        source: 'company A',
        mobile: '+61 50231 38795',
        email: 'sarajones@dummy.io'
    },
    {
        id: 'cp_019',
        client_name: 'Arjun Iyer',
        gender: 'M',
        age_group: '41-50',
        city: 'Seattle',
        country: 'USA',
        role: 'Account Manager',
        company: 'PrimeWorks',
        industry_sector: 'E-commerce',
        linkedin_link: 'https://www.linkedin.com/in/arjun-iyer-account-manager-69fa',
        source: 'direct',
        mobile: '+1 79673 19628',
        email: 'arjuniyer@example.com'
    },
    {
        id: 'cp_020',
        client_name: 'Emma Verma',
        gender: 'F',
        age_group: '41-50',
        city: 'Delhi',
        country: 'India',
        role: 'Data Scientist',
        company: 'Aurora Group',
        industry_sector: 'Financial Services',
        linkedin_link: 'https://www.linkedin.com/in/emma-verma-data-scientist-wste',
        source: 'company C',
        mobile: '+91 19288 93908',
        email: 'emmaverma@sample.org'
    },
    {
        id: 'cp_021',
        client_name: 'Reyansh Garcia',
        gender: 'F',
        age_group: '41-50',
        city: 'Melbourne',
        country: 'Australia',
        role: 'Director of Marketing',
        company: 'Quantum Analytics',
        industry_sector: 'Education',
        linkedin_link: 'https://www.linkedin.com/in/reyansh-garcia-director-of-marketing-ah63',
        source: 'referral',
        mobile: '+61 80547 33815',
        email: 'reyanshgarcia@testmail.com'
    },
    {
        id: 'cp_022',
        client_name: 'Mason Verma',
        gender: 'M',
        age_group: '41-50',
        city: 'Nashik',
        country: 'India',
        role: 'Customer Success Manager',
        company: 'Zenith Retail',
        industry_sector: 'Automotive',
        linkedin_link: 'https://www.linkedin.com/in/mason-verma-customer-success-manager-x9xl',
        source: 'referral',
        mobile: '+91 44488 16580',
        email: 'masonverma@sample.org'
    },
    {
        id: 'cp_023',
        client_name: 'Diya Brown',
        gender: 'F',
        age_group: '41-50',
        city: 'Bengaluru',
        country: 'India',
        role: 'Product Manager',
        company: 'GreenLeaf Corp',
        industry_sector: 'Telecommunications',
        linkedin_link: 'https://www.linkedin.com/in/diya-brown-product-manager-btlb',
        source: 'direct',
        mobile: '+91 16078 78631',
        email: 'diyabrown@dummy.io'
    },
    {
        id: 'cp_024',
        client_name: 'Lucas Kulkarni',
        gender: 'M',
        age_group: '20-30',
        city: 'Kolkata',
        country: 'India',
        role: 'VP Sales',
        company: 'Quantum Analytics',
        industry_sector: 'Automotive',
        linkedin_link: 'https://www.linkedin.com/in/lucas-kulkarni-vp-sales-zvnp',
        source: 'company A',
        mobile: '+91 28589 08057',
        email: 'lucaskulkarni@sample.org'
    },
    {
        id: 'cp_025',
        client_name: 'James Hernandez',
        gender: 'M',
        age_group: '>51',
        city: 'Sydney',
        country: 'Australia',
        role: 'Project Manager',
        company: 'Zenith Retail',
        industry_sector: 'Telecommunications',
        linkedin_link: 'https://www.linkedin.com/in/james-hernandez-project-manager-bk1n',
        source: 'company A',
        mobile: '+61 87969 10008',
        email: 'jameshernandez@dummy.io'
    },
    {
        id: 'cp_026',
        client_name: 'Aadhya Kulkarni',
        gender: 'M',
        age_group: '31-40',
        city: 'Berlin',
        country: 'Germany',
        role: 'Operations Manager',
        company: 'Quantum Analytics',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/aadhya-kulkarni-operations-manager-yd77',
        source: 'referral',
        mobile: '+49 87436 87862',
        email: 'aadhyakulkarni@dummy.io'
    },
    {
        id: 'cp_027',
        client_name: 'Aadhya Agarwal',
        gender: 'M',
        age_group: '20-30',
        city: 'Singapore',
        country: 'Singapore',
        role: 'Design Lead',
        company: 'Quantum Analytics',
        industry_sector: 'Logistics',
        linkedin_link: 'https://www.linkedin.com/in/aadhya-agarwal-design-lead-7f3g',
        source: 'company B',
        mobile: '+65 71529 19501',
        email: 'aadhyaagarwal@testmail.com'
    },
    {
        id: 'cp_028',
        client_name: 'David Garcia',
        gender: 'M',
        age_group: '20-30',
        city: 'Seattle',
        country: 'USA',
        role: 'Account Manager',
        company: 'BrightPath',
        industry_sector: 'Logistics',
        linkedin_link: 'https://www.linkedin.com/in/david-garcia-account-manager-bpod',
        source: 'company A',
        mobile: '+1 40093 79565',
        email: 'davidgarcia@sample.org'
    },
    {
        id: 'cp_029',
        client_name: 'Amelia Agarwal',
        gender: 'M',
        age_group: '31-40',
        city: 'Delhi',
        country: 'India',
        role: 'Consultant',
        company: 'Apex Digital',
        industry_sector: 'Hospitality',
        linkedin_link: 'https://www.linkedin.com/in/amelia-agarwal-consultant-yqxa',
        source: 'referral',
        mobile: '+91 29563 71155',
        email: 'ameliaagarwal@sample.org'
    },
    {
        id: 'cp_030',
        client_name: 'Sophia Brown',
        gender: 'F',
        age_group: '20-30',
        city: 'Kolkata',
        country: 'India',
        role: 'Director of Marketing',
        company: 'Catalyst Soft',
        industry_sector: 'Retail',
        linkedin_link: 'https://www.linkedin.com/in/sophia-brown-director-of-marketing-loro',
        source: 'company A',
        mobile: '+91 53101 10086',
        email: 'sophiabrown@dummy.io'
    },
    {
        id: 'cp_031',
        client_name: 'Lucas Garcia',
        gender: 'M',
        age_group: '>51',
        city: 'Mumbai',
        country: 'India',
        role: 'VP Engineering',
        company: 'PrimeWorks',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/lucas-garcia-vp-engineering-o30n',
        source: 'direct',
        mobile: '+91 31033 88323',
        email: 'lucasgarcia@dummy.io'
    },
    {
        id: 'cp_032',
        client_name: 'Emma Agarwal',
        gender: 'M',
        age_group: '>51',
        city: 'Delhi',
        country: 'India',
        role: 'Product Manager',
        company: 'Vertex Labs',
        industry_sector: 'Retail',
        linkedin_link: 'https://www.linkedin.com/in/emma-agarwal-product-manager-zu46',
        source: 'referral',
        mobile: '+91 14364 94903',
        email: 'emmaagarwal@dummy.io'
    },
    {
        id: 'cp_033',
        client_name: 'Reyansh Hernandez',
        gender: 'F',
        age_group: '>51',
        city: 'Berlin',
        country: 'Germany',
        role: 'DevOps Engineer',
        company: 'Trident Logistics',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/reyansh-hernandez-devops-engineer-e1fo',
        source: 'company C',
        mobile: '+49 46671 59470',
        email: 'reyanshhernandez@dummy.io'
    },
    {
        id: 'cp_034',
        client_name: 'Isabella Gupta',
        gender: 'F',
        age_group: '>51',
        city: 'Singapore',
        country: 'Singapore',
        role: 'VP Sales',
        company: 'Sunrise Ventures',
        industry_sector: 'Logistics',
        linkedin_link: 'https://www.linkedin.com/in/isabella-gupta-vp-sales-ze82',
        source: 'company B',
        mobile: '+65 14661 15739',
        email: 'isabellagupta@mailinator.com'
    },
    {
        id: 'cp_035',
        client_name: 'Chloe Garcia',
        gender: 'F',
        age_group: '31-40',
        city: 'Chennai',
        country: 'India',
        role: 'Business Analyst',
        company: 'Trident Logistics',
        industry_sector: 'E-commerce',
        linkedin_link: 'https://www.linkedin.com/in/chloe-garcia-business-analyst-2ldb',
        source: 'referral',
        mobile: '+91 09405 06641',
        email: 'chloegarcia@testmail.com'
    },
    {
        id: 'cp_036',
        client_name: 'Anaya Garcia',
        gender: 'M',
        age_group: '41-50',
        city: 'Dubai',
        country: 'UAE',
        role: 'Operations Manager',
        company: 'TechNova Pvt Ltd',
        industry_sector: 'Media & Entertainment',
        linkedin_link: 'https://www.linkedin.com/in/anaya-garcia-operations-manager-rp0f',
        source: 'company C',
        mobile: '+971 12775 95915',
        email: 'anayagarcia@mailinator.com'
    },
    {
        id: 'cp_037',
        client_name: 'Emily Kulkarni',
        gender: 'M',
        age_group: '41-50',
        city: 'Sydney',
        country: 'Australia',
        role: 'Director of Marketing',
        company: 'TechNova Pvt Ltd',
        industry_sector: 'Telecommunications',
        linkedin_link: 'https://www.linkedin.com/in/emily-kulkarni-director-of-marketing-zwyi',
        source: 'referral',
        mobile: '+61 74787 22212',
        email: 'emilykulkarni@mailinator.com'
    },
    {
        id: 'cp_038',
        client_name: 'Aarav Gupta',
        gender: 'F',
        age_group: '41-50',
        city: 'London',
        country: 'UK',
        role: 'CFO',
        company: 'Sunrise Ventures',
        industry_sector: 'Telecommunications',
        linkedin_link: 'https://www.linkedin.com/in/aarav-gupta-cfo-lctd',
        source: 'company B',
        mobile: '+44 61347 43643',
        email: 'aaravgupta@example.com'
    },
    {
        id: 'cp_039',
        client_name: 'Myra Johnson',
        gender: 'F',
        age_group: '41-50',
        city: 'Berlin',
        country: 'Germany',
        role: 'Design Lead',
        company: 'GreenLeaf Corp',
        industry_sector: 'Financial Services',
        linkedin_link: 'https://www.linkedin.com/in/myra-johnson-design-lead-aznq',
        source: 'company B',
        mobile: '+49 12637 78628',
        email: 'myrajohnson@testmail.com'
    },
    {
        id: 'cp_040',
        client_name: 'Noah Deshpande',
        gender: 'F',
        age_group: '41-50',
        city: 'Doha',
        country: 'Qatar',
        role: 'Operations Manager',
        company: 'Zenith Retail',
        industry_sector: 'Pharmaceuticals',
        linkedin_link: 'https://www.linkedin.com/in/noah-deshpande-operations-manager-pxzi',
        source: 'company B',
        mobile: '+974 25154 73763',
        email: 'noahdeshpande@example.com'
    },
    {
        id: 'cp_041',
        client_name: 'Aarohi Sharma',
        gender: 'F',
        age_group: '31-40',
        city: 'Nagpur',
        country: 'India',
        role: 'Director of Marketing',
        company: 'Crescent Infotech',
        industry_sector: 'Healthcare',
        linkedin_link: 'https://www.linkedin.com/in/aarohi-sharma-director-of-marketing-yxft',
        source: 'referral',
        mobile: '+91 67505 27670',
        email: 'aarohisharma@dummy.io'
    },
    {
        id: 'cp_042',
        client_name: 'Navya Gupta',
        gender: 'F',
        age_group: '31-40',
        city: 'Seattle',
        country: 'USA',
        role: 'Data Scientist',
        company: 'Helios Networks',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/navya-gupta-data-scientist-0wbf',
        source: 'company B',
        mobile: '+1 25088 93892',
        email: 'navyagupta@example.com'
    },
    {
        id: 'cp_043',
        client_name: 'Arjun Davis',
        gender: 'F',
        age_group: '>51',
        city: 'Nashik',
        country: 'India',
        role: 'Product Manager',
        company: 'Vertex Labs',
        industry_sector: 'Automotive',
        linkedin_link: 'https://www.linkedin.com/in/arjun-davis-product-manager-owhw',
        source: 'referral',
        mobile: '+91 06862 82531',
        email: 'arjundavis@mailinator.com'
    },
    {
        id: 'cp_044',
        client_name: 'Arjun Johnson',
        gender: 'M',
        age_group: '41-50',
        city: 'Hyderabad',
        country: 'India',
        role: 'Customer Success Manager',
        company: 'Helios Networks',
        industry_sector: 'Hospitality',
        linkedin_link: 'https://www.linkedin.com/in/arjun-johnson-customer-success-manager-c1n1',
        source: 'company C',
        mobile: '+91 06973 16898',
        email: 'arjunjohnson@dummy.io'
    },
    {
        id: 'cp_045',
        client_name: 'Aarohi Garcia',
        gender: 'F',
        age_group: '31-40',
        city: 'Berlin',
        country: 'Germany',
        role: 'Business Analyst',
        company: 'PrimeWorks',
        industry_sector: 'Real Estate',
        linkedin_link: 'https://www.linkedin.com/in/aarohi-garcia-business-analyst-rzy6',
        source: 'company B',
        mobile: '+49 35140 16763',
        email: 'aarohigarcia@dummy.io'
    },
    {
        id: 'cp_046',
        client_name: 'Ira Iyer',
        gender: 'F',
        age_group: '20-30',
        city: 'Kolkata',
        country: 'India',
        role: 'Project Manager',
        company: 'Sunrise Ventures',
        industry_sector: 'Hospitality',
        linkedin_link: 'https://www.linkedin.com/in/ira-iyer-project-manager-wjp7',
        source: 'company C',
        mobile: '+91 37909 57896',
        email: 'iraiyer@mailinator.com'
    },
    {
        id: 'cp_047',
        client_name: 'Vihaan Miller',
        gender: 'F',
        age_group: '41-50',
        city: 'Kolkata',
        country: 'India',
        role: 'Operations Manager',
        company: 'BrightPath',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/vihaan-miller-operations-manager-8c9x',
        source: 'company B',
        mobile: '+91 96843 37507',
        email: 'vihaanmiller@testmail.com'
    },
    {
        id: 'cp_048',
        client_name: 'Ethan Kulkarni',
        gender: 'M',
        age_group: '>51',
        city: 'Pune',
        country: 'India',
        role: 'Customer Success Manager',
        company: 'BlueSky Solutions',
        industry_sector: 'Education',
        linkedin_link: 'https://www.linkedin.com/in/ethan-kulkarni-customer-success-manager-czdm',
        source: 'referral',
        mobile: '+91 82740 54567',
        email: 'ethankulkarni@dummy.io'
    },
    {
        id: 'cp_049',
        client_name: 'Daniel Martinez',
        gender: 'M',
        age_group: '20-30',
        city: 'Seattle',
        country: 'USA',
        role: 'VP Engineering',
        company: 'Helios Networks',
        industry_sector: 'Financial Services',
        linkedin_link: 'https://www.linkedin.com/in/daniel-martinez-vp-engineering-xm55',
        source: 'referral',
        mobile: '+1 95252 20973',
        email: 'danielmartinez@mailinator.com'
    },
    {
        id: 'cp_050',
        client_name: 'Aarohi Sharma',
        gender: 'F',
        age_group: '41-50',
        city: 'San Francisco',
        country: 'USA',
        role: 'VP Engineering',
        company: 'NorthStar Global',
        industry_sector: 'Energy',
        linkedin_link: 'https://www.linkedin.com/in/aarohi-sharma-vp-engineering-7ac0',
        source: 'company A',
        mobile: '+1 06573 33465',
        email: 'aarohisharma2@dummy.io'
    }
];

// Helper to convert gender to sex format
function convertGender(gender) {
    if (gender === 'M') return 'Male';
    if (gender === 'F') return 'Female';
    return gender;
}

// Helper to split client name into first and second name
function splitName(fullName) {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
        return { firstName: parts[0], secondName: '' };
    }
    return {
        firstName: parts[0],
        secondName: parts.slice(1).join(' ')
    };
}

// Get unique sources from the data
function getUniqueSources() {
    const sources = new Set();
    clientProspectsData.forEach(prospect => {
        sources.add(prospect.source);
    });
    return Array.from(sources);
}

async function main() {
    console.log('Seeding client prospects to coachees table...');
    
    // Get unique sources
    const uniqueSources = getUniqueSources();
    console.log('Unique sources found:', uniqueSources);
    
    // Create a map of source names to source IDs
    const sourceIdMap = {};
    
    // First, ensure all sources exist in the sources table
    for (const sourceName of uniqueSources) {
        const sourceId = 'src_prospect_' + sourceName.toLowerCase().replace(/\s+/g, '_');
        
        try {
            await query(
                `INSERT INTO sources (id, name, created_on, last_updated)
                 VALUES ($1, $2, NOW(), NOW())
                 ON CONFLICT (id) DO NOTHING`,
                [sourceId, sourceName]
            );
            sourceIdMap[sourceName] = sourceId;
            console.log(`Source created/matched: ${sourceName} -> ${sourceId}`);
        } catch (err) {
            console.error(`Error creating source ${sourceName}:`, err.message);
        }
    }
    
    // Now insert all client prospects into coachees table
    const results = [];
    for (const prospect of clientProspectsData) {
        try {
            const nameParts = splitName(prospect.client_name);
            const sex = convertGender(prospect.gender);
            const sourceId = sourceIdMap[prospect.source];
            
            await query(
                `INSERT INTO coachees (
                    id, type, first_name, second_name, age_group, sex, email, phone, linkedin,
                    occupation, organisation, city, country, source_id, created_on, last_updated
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW()
                ) ON CONFLICT (id) DO NOTHING`,
                [
                    prospect.id,
                    'Individual',
                    nameParts.firstName,
                    nameParts.secondName,
                    prospect.age_group,
                    sex,
                    prospect.email,
                    prospect.mobile,
                    prospect.linkedin_link,
                    prospect.role,
                    prospect.company,
                    prospect.city,
                    prospect.country,
                    sourceId
                ]
            );
            results.push({ id: prospect.id, client_name: prospect.client_name, result: 'success' });
        } catch (err) {
            results.push({ id: prospect.id, client_name: prospect.client_name, result: 'failed', error: err.message });
            console.error(`Error inserting ${prospect.client_name}:`, err.message);
        }
    }
    
    // Get count of all coachees
    const countResult = await query('SELECT COUNT(*) as count FROM coachees');
    
    const output = {
        total_attempted: clientProspectsData.length,
        total_in_db: parseInt(countResult.rows[0].count),
        results: results
    };
    
    fs.writeFileSync('seed_prospects_to_coachees_result.json', JSON.stringify(output, null, 2));
    console.log(JSON.stringify(output, null, 2));
    
    // Close the pool
    await pool.end();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
