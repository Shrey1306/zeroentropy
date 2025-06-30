"""
Sample Documents Data Module

This module contains a comprehensive collection of sample documents across various
industries and use cases to demonstrate ZeroEntropy's knowledge synthesis capabilities.
Documents are structured to show real-world enterprise scenarios and challenges.
"""

from typing import List, Dict, Any

# Sample documents organized by industry and use case
SAMPLE_DOCUMENTS = [
    # Technology & Innovation
    {
        "title": "AI Strategy Roadmap 2024",
        "content": """
        Executive Summary: Our AI transformation strategy focuses on three pillars: 
        operational efficiency, customer experience enhancement, and new revenue streams. 
        Key initiatives include implementing machine learning for predictive analytics, 
        developing conversational AI for customer support, and creating AI-powered 
        recommendation engines. Budget allocation: 40% for infrastructure, 35% for 
        talent acquisition, 25% for partnerships and acquisitions. Expected ROI: 
        300% within 18 months through process automation and enhanced decision-making.
        """,
        "category": "Technology",
        "tags": ["AI", "Strategy", "Innovation", "ROI"]
    },
    
    {
        "title": "Cloud Migration Assessment",
        "content": """
        Current State Analysis: 60% of applications remain on-premises with legacy 
        infrastructure. Migration priorities: 1) Customer-facing applications (Q1), 
        2) Data analytics platforms (Q2), 3) Internal systems (Q3-Q4). Estimated 
        cost savings: $2.4M annually. Risk mitigation strategies include hybrid 
        cloud approach and gradual migration with rollback capabilities. Vendor 
        evaluation: AWS (40% market share), Azure (30%), GCP (20%), others (10%).
        """,
        "category": "Technology",
        "tags": ["Cloud", "Migration", "Infrastructure", "Cost Savings"]
    },
    
    {
        "title": "Cybersecurity Framework Implementation",
        "content": """
        Security Posture: Implementing NIST Cybersecurity Framework across all 
        business units. Current gaps: endpoint protection (30% coverage), 
        data encryption (60% coverage), access controls (80% coverage). 
        Investment required: $1.8M over 12 months. Compliance requirements: 
        SOC 2, ISO 27001, GDPR. Incident response plan includes 24/7 monitoring, 
        automated threat detection, and executive notification protocols.
        """,
        "category": "Technology",
        "tags": ["Security", "Compliance", "Risk Management", "Framework"]
    },
    
    # Finance & Investment
    {
        "title": "Q4 Financial Performance Analysis",
        "content": """
        Revenue Growth: 23% YoY increase to $156M, driven by subscription services 
        (45% of revenue) and enterprise contracts (35%). EBITDA margin improved to 
        28% from 24% last year. Customer acquisition cost decreased 15% while 
        lifetime value increased 22%. Cash position: $89M with $45M in revolving 
        credit facility. Debt-to-equity ratio: 0.3x, well below industry average 
        of 0.8x. Dividend payout ratio maintained at 40%.
        """,
        "category": "Finance",
        "tags": ["Financial", "Performance", "Growth", "Metrics"]
    },
    
    {
        "title": "M&A Target Evaluation Report",
        "content": """
        Target Company: TechCorp Solutions, $85M revenue, 15% EBITDA margin. 
        Synergy opportunities: $12M annual cost savings through operational 
        consolidation, $8M revenue synergies from cross-selling. Valuation: 
        8.5x EBITDA multiple, 2.1x revenue multiple. Integration timeline: 
        18 months with $5M one-time costs. Risk factors: customer concentration 
        (top 3 clients: 40% of revenue), technology debt, key person risk. 
        Expected IRR: 25% over 5-year holding period.
        """,
        "category": "Finance",
        "tags": ["M&A", "Valuation", "Synergies", "Investment"]
    },
    
    {
        "title": "Risk Management Framework",
        "content": """
        Enterprise Risk Categories: Strategic (30% weight), Operational (25%), 
        Financial (20%), Compliance (15%), Technology (10%). Risk appetite: 
        Conservative for financial risks, moderate for strategic initiatives. 
        Key risk indicators: market volatility, customer churn, regulatory changes, 
        cybersecurity incidents. Mitigation strategies: diversification, insurance, 
        hedging, scenario planning. Board oversight: quarterly risk reviews with 
        monthly executive updates.
        """,
        "category": "Finance",
        "tags": ["Risk Management", "Framework", "Compliance", "Strategy"]
    },
    
    # Healthcare & Life Sciences
    {
        "title": "Clinical Trial Results - Phase II",
        "content": """
        Drug Candidate: ZX-1234 for autoimmune disorders. Primary endpoint: 
        65% response rate vs 35% placebo (p<0.001). Secondary endpoints: 
        safety profile maintained, no serious adverse events. Patient population: 
        240 subjects across 15 sites. Statistical power: 90% with 95% confidence 
        interval. Next steps: Phase III planning with 800 patients, FDA pre-submission 
        meeting scheduled. Commercial potential: $2.8B market opportunity with 
        15% market share target.
        """,
        "category": "Healthcare",
        "tags": ["Clinical Trial", "Drug Development", "FDA", "Market Analysis"]
    },
    
    {
        "title": "Healthcare Provider Network Analysis",
        "content": """
        Network Coverage: 85% of target population within 30-minute drive time. 
        Provider mix: 40% primary care, 30% specialists, 20% hospitals, 10% 
        ancillary services. Quality metrics: 4.2/5 average provider rating, 
        92% patient satisfaction score. Cost efficiency: 15% below regional 
        average for similar services. Expansion opportunities: 3 new markets 
        identified with 2M potential members. Technology integration: 80% 
        of providers using electronic health records.
        """,
        "category": "Healthcare",
        "tags": ["Healthcare", "Network", "Quality", "Expansion"]
    },
    
    {
        "title": "Regulatory Compliance Strategy",
        "content": """
        Compliance Framework: FDA, EMA, and local regulatory requirements. 
        Current status: 95% compliance rate across all jurisdictions. 
        Audit findings: minor documentation gaps (5 items), no critical findings. 
        Remediation plan: 30-day timeline for all identified issues. Training 
        program: 100% completion rate for regulatory staff, quarterly updates 
        for all employees. Quality management system: ISO 13485 certified, 
        annual surveillance audits scheduled.
        """,
        "category": "Healthcare",
        "tags": ["Regulatory", "Compliance", "FDA", "Quality"]
    },
    
    # Manufacturing & Operations
    {
        "title": "Supply Chain Optimization Report",
        "content": """
        Current State: 45 suppliers across 12 countries, 60-day average lead time. 
        Optimization opportunities: supplier consolidation (reduce by 30%), 
        inventory reduction (25% decrease), transportation optimization (15% 
        cost savings). Risk mitigation: dual sourcing for critical components, 
        safety stock for high-demand items. Technology investments: $2M for 
        supply chain visibility platform, $1.5M for demand forecasting tools. 
        Expected savings: $8M annually with 6-month payback period.
        """,
        "category": "Manufacturing",
        "tags": ["Supply Chain", "Optimization", "Cost Savings", "Risk"]
    },
    
    {
        "title": "Quality Management System Review",
        "content": """
        Quality Metrics: 99.2% first-pass yield, 0.8% defect rate, 98.5% 
        customer satisfaction. Process improvements: Six Sigma implementation 
        reduced defects by 40%, lean manufacturing increased efficiency by 25%. 
        Training program: 200 hours annually per employee, certification required 
        for critical processes. Audit results: ISO 9001:2015 certified, zero 
        major non-conformances. Continuous improvement: 15 kaizen events completed, 
        $500K annual savings realized.
        """,
        "category": "Manufacturing",
        "tags": ["Quality", "Six Sigma", "ISO", "Continuous Improvement"]
    },
    
    {
        "title": "Production Capacity Planning",
        "content": """
        Current Capacity: 1.2M units annually across 3 facilities. Demand 
        forecast: 1.8M units by 2025 (50% growth). Expansion options: 
        Facility A expansion (40% capacity increase, $15M investment), 
        new facility construction (100% capacity increase, $45M investment), 
        automation upgrades (30% capacity increase, $8M investment). 
        Recommended approach: phased expansion with automation first, 
        then facility expansion. ROI analysis: 3-year payback period, 
        25% IRR over 10 years.
        """,
        "category": "Manufacturing",
        "tags": ["Capacity", "Planning", "Expansion", "ROI"]
    },
    
    # Retail & E-commerce
    {
        "title": "Omnichannel Strategy Implementation",
        "content": """
        Channel Performance: Online (45% of sales, 35% growth), stores (40% 
        of sales, 5% growth), mobile (15% of sales, 60% growth). Integration 
        initiatives: unified inventory system (90% complete), seamless 
        customer experience (80% complete), data analytics platform (70% 
        complete). Customer journey mapping: 5 touchpoints identified, 
        conversion optimization in progress. Technology stack: Salesforce 
        Commerce Cloud, Shopify Plus, custom mobile app. Investment: $12M 
        over 18 months, expected 40% revenue increase.
        """,
        "category": "Retail",
        "tags": ["Omnichannel", "E-commerce", "Customer Experience", "Technology"]
    },
    
    {
        "title": "Customer Segmentation Analysis",
        "content": """
        Segmentation Framework: 5 customer segments identified based on 
        behavior, demographics, and value. High-value customers (20% of base, 
        60% of revenue): average order value $450, 8 purchases annually. 
        Growth opportunities: millennials (30% of base, 25% growth rate), 
        premium segment (10% of base, 40% growth rate). Personalization 
        strategy: product recommendations (25% conversion lift), targeted 
        marketing (30% response rate improvement), loyalty programs (15% 
        retention increase).
        """,
        "category": "Retail",
        "tags": ["Customer Segmentation", "Analytics", "Personalization", "Growth"]
    },
    
    {
        "title": "Inventory Management Optimization",
        "content": """
        Current State: $45M inventory across 500 SKUs, 65-day average 
        turnover. Optimization strategies: demand forecasting (30% accuracy 
        improvement), safety stock reduction (20% decrease), supplier 
        collaboration (15% lead time reduction). Technology implementation: 
        AI-powered demand planning, RFID tracking, automated reorder systems. 
        Expected outcomes: $3M inventory reduction, 25% improvement in 
        stock availability, 15% reduction in carrying costs.
        """,
        "category": "Retail",
        "tags": ["Inventory", "Optimization", "AI", "Cost Reduction"]
    },
    
    # Energy & Sustainability
    {
        "title": "Renewable Energy Portfolio Strategy",
        "content": """
        Current Portfolio: 60% fossil fuels, 25% renewable energy, 15% 
        nuclear. Transition plan: 50% renewable by 2030, 80% by 2050. 
        Investment allocation: $15B over 10 years for solar (40%), wind 
        (35%), storage (15%), hydrogen (10%). Technology partnerships: 
        5 joint ventures with leading renewable companies. Regulatory 
        compliance: carbon reduction targets aligned with Paris Agreement. 
        Expected returns: 8-12% IRR, 20-year asset life, stable cash flows.
        """,
        "category": "Energy",
        "tags": ["Renewable Energy", "Sustainability", "Investment", "Strategy"]
    },
    
    {
        "title": "Carbon Footprint Reduction Plan",
        "content": """
        Current Emissions: 2.5M tons CO2e annually across operations. 
        Reduction targets: 30% by 2025, 50% by 2030, net-zero by 2050. 
        Key initiatives: energy efficiency (40% of reduction), renewable 
        energy (35%), process optimization (15%), carbon offsets (10%). 
        Investment required: $500M over 5 years. Technology solutions: 
        smart grid integration, energy management systems, carbon capture. 
        Stakeholder engagement: investor pressure, customer demand, 
        regulatory requirements.
        """,
        "category": "Energy",
        "tags": ["Carbon", "Sustainability", "Efficiency", "Technology"]
    },
    
    {
        "title": "Energy Trading and Risk Management",
        "content": """
        Trading Portfolio: $2B notional value across electricity, natural 
        gas, and carbon markets. Risk limits: VaR $50M (95% confidence), 
        position limits $200M per commodity. Hedging strategies: 80% of 
        production hedged 12 months forward, dynamic hedging for 20% 
        exposure. Market analysis: volatility modeling, correlation analysis, 
        scenario planning. Technology platform: real-time risk monitoring, 
        automated trading algorithms, compliance reporting.
        """,
        "category": "Energy",
        "tags": ["Trading", "Risk Management", "Hedging", "Compliance"]
    },
    
    # Real Estate & Construction
    {
        "title": "Commercial Real Estate Market Analysis",
        "content": """
        Market Overview: $15B portfolio across office (40%), retail (25%), 
        industrial (20%), multifamily (15%). Market trends: office vacancy 
        rates 12% (pre-pandemic 8%), industrial demand +25% YoY, retail 
        transformation ongoing. Investment strategy: focus on logistics 
        and data centers, selective office acquisitions, retail repositioning. 
        Cap rates: office 6.5%, industrial 5.2%, retail 7.1%, multifamily 5.8%. 
        Development pipeline: $2B in projects, 18-month average timeline.
        """,
        "category": "Real Estate",
        "tags": ["Real Estate", "Market Analysis", "Investment", "Trends"]
    },
    
    {
        "title": "Construction Project Management",
        "content": """
        Project Portfolio: 15 active projects totaling $800M in value. 
        Performance metrics: 85% on-time delivery, 92% on-budget completion, 
        4.2/5 client satisfaction. Risk management: weather delays (15% 
        impact), material shortages (10% impact), labor availability (5% 
        impact). Technology adoption: BIM modeling (90% of projects), 
        drone surveying (60%), prefabrication (40%). Safety record: 
        0.8 incidents per 200K hours worked, industry average 2.1.
        """,
        "category": "Real Estate",
        "tags": ["Construction", "Project Management", "Technology", "Safety"]
    },
    
    {
        "title": "Property Technology Integration",
        "content": """
        Proptech Stack: building management systems (100% adoption), 
        tenant portals (80%), smart building sensors (60%), predictive 
        maintenance (40%). Investment: $25M over 3 years, expected $8M 
        annual savings. Use cases: energy optimization (20% reduction), 
        maintenance efficiency (30% improvement), tenant satisfaction 
        (25% increase). Data analytics: occupancy tracking, usage patterns, 
        predictive analytics. Integration challenges: legacy systems, 
        data silos, vendor lock-in.
        """,
        "category": "Real Estate",
        "tags": ["Proptech", "Smart Buildings", "Analytics", "Efficiency"]
    },
    
    # Legal & Compliance
    {
        "title": "Legal Risk Assessment Framework",
        "content": """
        Risk Categories: litigation (40% weight), regulatory (30%), 
        contractual (20%), intellectual property (10%). Current exposure: 
        $50M in pending litigation, $25M in regulatory matters. Mitigation 
        strategies: early case assessment, alternative dispute resolution, 
        compliance monitoring, IP protection. Legal spend: $15M annually, 
        60% external counsel, 40% internal resources. Technology solutions: 
        contract management, e-discovery, legal analytics, compliance tracking.
        """,
        "category": "Legal",
        "tags": ["Legal Risk", "Compliance", "Litigation", "Technology"]
    },
    
    {
        "title": "Contract Management Optimization",
        "content": """
        Contract Portfolio: 2,500 active contracts worth $2.5B annually. 
        Management challenges: manual processes (70% of contracts), 
        inconsistent terms (25% variation), renewal tracking (15% missed). 
        Technology solution: AI-powered contract analysis, automated 
        workflows, risk scoring, compliance monitoring. Implementation: 
        18-month timeline, $3M investment, 5-person team. Expected benefits: 
        40% time savings, 30% risk reduction, 25% cost savings, 100% 
        compliance tracking.
        """,
        "category": "Legal",
        "tags": ["Contract Management", "AI", "Automation", "Compliance"]
    },
    
    {
        "title": "Intellectual Property Strategy",
        "content": """
        IP Portfolio: 150 patents, 75 trademarks, 25 copyrights, 50 
        trade secrets. Value assessment: $500M in IP assets, $100M 
        annual licensing revenue. Protection strategy: patent filing 
        (20 new applications annually), trademark registration (global 
        coverage), trade secret protection (employee agreements, security). 
        Enforcement: 5 active infringement cases, $25M in damages sought. 
        Technology focus: AI/ML patents (40%), software (30%), hardware (30%).
        """,
        "category": "Legal",
        "tags": ["Intellectual Property", "Patents", "Strategy", "Enforcement"]
    },
    
    # Marketing & Sales
    {
        "title": "Digital Marketing Performance Analysis",
        "content": """
        Channel Performance: paid search (40% of leads, $150 CPA), 
        social media (25% of leads, $200 CPA), email (20% of leads, 
        $50 CPA), content marketing (15% of leads, $300 CPA). Conversion 
        rates: website 2.5%, landing pages 8%, email 15%. ROI by channel: 
        email 400%, paid search 250%, social media 180%, content 120%. 
        Optimization opportunities: A/B testing (25% improvement), 
        personalization (30% lift), automation (40% efficiency gain).
        """,
        "category": "Marketing",
        "tags": ["Digital Marketing", "Performance", "ROI", "Optimization"]
    },
    
    {
        "title": "Sales Pipeline Management",
        "content": """
        Pipeline Value: $50M across 200 opportunities. Stage distribution: 
        prospecting (30%), qualification (25%), proposal (20%), negotiation 
        (15%), closing (10%). Conversion rates: 15% overall, 40% in final 
        stages. Sales cycle: 90 days average, 45 days for qualified leads. 
        Performance metrics: quota attainment 85%, average deal size $250K, 
        win rate 25%. Technology stack: Salesforce CRM, SalesLoft, 
        LinkedIn Sales Navigator, Gong call recording.
        """,
        "category": "Sales",
        "tags": ["Sales Pipeline", "CRM", "Performance", "Technology"]
    },
    
    {
        "title": "Customer Experience Strategy",
        "content": """
        CX Framework: 5 pillars - ease of use, personalization, consistency, 
        speed, empathy. Current scores: overall 7.2/10, ease 7.5, personalization 
        6.8, consistency 7.0, speed 7.8, empathy 7.1. Improvement initiatives: 
        omnichannel integration (target 8.5), AI-powered personalization 
        (target 8.0), proactive support (target 8.2). Investment: $10M over 
        2 years. Expected outcomes: 25% customer satisfaction increase, 
        30% retention improvement, 20% revenue growth from existing customers.
        """,
        "category": "Marketing",
        "tags": ["Customer Experience", "Strategy", "Personalization", "ROI"]
    },
    
    # Human Resources
    {
        "title": "Talent Acquisition Strategy",
        "content": """
        Hiring Goals: 500 new employees annually across engineering (40%), 
        sales (25%), operations (20%), support (15%). Sourcing channels: 
        employee referrals (30% of hires), LinkedIn (25%), job boards (20%), 
        direct sourcing (15%), campus recruiting (10%). Time-to-fill: 45 days 
        average, 30 days for critical roles. Cost per hire: $8,000 average, 
        $15,000 for senior positions. Technology stack: Workday ATS, 
        LinkedIn Recruiter, HiredScore AI, Greenhouse CRM.
        """,
        "category": "HR",
        "tags": ["Talent Acquisition", "Recruiting", "Technology", "Metrics"]
    },
    
    {
        "title": "Employee Engagement Survey Results",
        "content": """
        Survey Participation: 85% response rate across 2,500 employees. 
        Overall engagement: 7.8/10 (industry average 7.2). Key drivers: 
        career growth (8.2), work-life balance (7.9), compensation (7.5), 
        leadership (7.3), company culture (8.0). Areas for improvement: 
        recognition (6.8), communication (7.0), innovation (7.2). Action 
        plan: quarterly recognition programs, monthly town halls, innovation 
        challenges, career development programs. Target: 8.5 engagement 
        score within 12 months.
        """,
        "category": "HR",
        "tags": ["Employee Engagement", "Survey", "Culture", "Leadership"]
    },
    
    {
        "title": "Learning and Development Program",
        "content": """
        Training Investment: $2M annually, 40 hours per employee. Program 
        categories: technical skills (40%), leadership development (25%), 
        soft skills (20%), compliance (15%). Delivery methods: online 
        courses (50%), instructor-led (30%), mentoring (15%), conferences 
        (5%). Technology platform: LinkedIn Learning, internal LMS, 
        virtual reality training. ROI measurement: skill assessments, 
        performance reviews, promotion rates, retention impact.
        """,
        "category": "HR",
        "tags": ["Learning", "Development", "Training", "ROI"]
    },
    
    # Research & Development
    {
        "title": "R&D Pipeline Overview",
        "content": """
        Research Portfolio: 25 active projects across 5 technology areas. 
        Investment: $50M annually, 15% of revenue. Project distribution: 
        early stage (40%), development (35%), validation (20%), launch (5%). 
        Success rates: 15% from concept to launch, 60% technical success, 
        40% commercial success. Key focus areas: AI/ML (40% of budget), 
        cloud computing (25%), cybersecurity (20%), IoT (15%). Partnerships: 
        10 university collaborations, 5 startup investments, 3 joint ventures.
        """,
        "category": "R&D",
        "tags": ["R&D", "Innovation", "Technology", "Pipeline"]
    },
    
    {
        "title": "Patent Portfolio Analysis",
        "content": """
        Patent Holdings: 200 active patents, 50 pending applications, 
        25 international filings. Technology breakdown: software (45%), 
        hardware (30%), algorithms (15%), processes (10%). Geographic 
        coverage: US (60%), Europe (25%), Asia (15%). Value assessment: 
        $300M in patent assets, $50M annual licensing revenue. Strategic 
        focus: defensive patents (60%), offensive patents (30%), 
        licensing opportunities (10%). Maintenance costs: $2M annually.
        """,
        "category": "R&D",
        "tags": ["Patents", "Intellectual Property", "Technology", "Strategy"]
    },
    
    {
        "title": "Innovation Management Framework",
        "content": """
        Innovation Process: ideation (30% of time), evaluation (25%), 
        development (30%), commercialization (15%). Idea sources: 
        employees (40%), customers (25%), partners (20%), external 
        research (15%). Evaluation criteria: technical feasibility, 
        market potential, strategic fit, resource requirements. 
        Governance: innovation council, stage-gate process, 
        portfolio management. Success metrics: new product revenue 
        (target 20% of total), patent filings (target 25 annually), 
        time to market (target 18 months).
        """,
        "category": "R&D",
        "tags": ["Innovation", "Process", "Management", "Metrics"]
    }
]

def get_documents_by_category(category: str = None) -> List[Dict[str, Any]]:
    """
    Retrieves documents filtered by category.
    
    Args:
        category (str): Optional category filter
        
    Returns:
        List[Dict[str, Any]]: Filtered list of documents
    """
    if category:
        return [doc for doc in SAMPLE_DOCUMENTS if doc["category"] == category]
    return SAMPLE_DOCUMENTS

def get_documents_by_tags(tags: List[str]) -> List[Dict[str, Any]]:
    """
    Retrieves documents filtered by tags.
    
    Args:
        tags (List[str]): List of tags to filter by
        
    Returns:
        List[Dict[str, Any]]: Filtered list of documents
    """
    return [doc for doc in SAMPLE_DOCUMENTS if any(tag in doc["tags"] for tag in tags)]

def get_all_categories() -> List[str]:
    """
    Returns all unique categories in the document collection.
    
    Returns:
        List[str]: List of unique categories
    """
    return list(set(doc["category"] for doc in SAMPLE_DOCUMENTS))

def get_all_tags() -> List[str]:
    """
    Returns all unique tags in the document collection.
    
    Returns:
        List[str]: List of unique tags
    """
    all_tags = []
    for doc in SAMPLE_DOCUMENTS:
        all_tags.extend(doc["tags"])
    return list(set(all_tags)) 