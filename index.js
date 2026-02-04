<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PAUSE - Your Emotional Intelligence Companion</title>
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 style=%22fill:%2300cc66%22>🌿</text></svg>">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #667eea;
            --primary-dark: #5a67d8;
            --secondary: #764ba2;
            --accent: #38b2ac;
            --success: #48bb78;
            --warning: #ed8936;
            --light: #f8fafc;
            --dark: #1e293b;
            --gray: #64748b;
            --border-radius: 20px;
            --shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
            --shadow-hover: 0 25px 70px rgba(0, 0, 0, 0.12);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
            min-height: 100vh;
            color: var(--dark);
            line-height: 1.7;
            letter-spacing: -0.01em;
        }
        
        /* Header */
        .app-header {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 30px rgba(0, 0, 0, 0.03);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        }
        
        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.2rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: var(--dark);
            transition: var(--transition);
        }
        
        .logo:hover {
            transform: translateY(-2px);
        }
        
        .logo-icon {
            font-size: 32px;
            color: #00cc66;
            animation: float 6s ease-in-out infinite;
        }
        
        .logo-text {
            font-size: 24px;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Playfair Display', serif;
        }
        
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 1.2rem;
        }
        
        .nav-btn {
            background: none;
            border: none;
            color: var(--gray);
            font-size: 18px;
            cursor: pointer;
            padding: 10px;
            border-radius: 12px;
            transition: var(--transition);
            position: relative;
        }
        
        .nav-btn:hover {
            background: linear-gradient(135deg, #f1f5f9, #e8f0fe);
            color: var(--primary);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.1);
        }
        
        /* Response Length Selector */
        .length-selector {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #f1f5f9, #e8f0fe);
            padding: 6px;
            border-radius: 12px;
        }
        
        .length-label {
            font-size: 0.85rem;
            color: var(--primary-dark);
            font-weight: 600;
            padding: 0 8px;
        }
        
        .length-options {
            display: flex;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            padding: 3px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .length-option {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            border: none;
            background: none;
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition);
            color: var(--gray);
            white-space: nowrap;
            font-weight: 500;
        }
        
        .length-option:hover {
            color: var(--primary);
            background: rgba(102, 126, 234, 0.05);
        }
        
        .length-option.active {
            background: white;
            color: var(--primary);
            box-shadow: 0 3px 15px rgba(102, 126, 234, 0.2);
            font-weight: 600;
        }
        
        /* Main Container */
        .main-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        /* Hero Section */
        .hero-section {
            text-align: center;
            padding: 4rem 0 3rem;
            position: relative;
        }
        
        .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            font-family: 'Playfair Display', serif;
            letter-spacing: -0.02em;
        }
        
        .hero-subtitle {
            font-size: 1.3rem;
            color: var(--gray);
            max-width: 700px;
            margin: 0 auto 3rem;
            font-weight: 400;
            line-height: 1.6;
        }
        
        .trust-badges {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-top: 3rem;
        }
        
        .trust-badge {
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
            transition: var(--transition);
        }
        
        .trust-badge:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }
        
        .trust-badge i {
            color: var(--accent);
            font-size: 1.2rem;
        }
        
        /* Input Card */
        .input-card {
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 3rem;
            margin-bottom: 3rem;
            animation: fadeIn 0.6s ease-out;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.02);
        }
        
        .input-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #667eea, #764ba2, #38b2ac);
        }
        
        .input-label {
            display: block;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: var(--dark);
            line-height: 1.4;
        }
        
        .input-field {
            width: 100%;
            padding: 1.5rem 2rem;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            font-size: 1.1rem;
            transition: var(--transition);
            background: #f8fafc;
            margin-bottom: 1.5rem;
            font-family: inherit;
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.02);
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--primary);
            background: white;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15), inset 0 2px 10px rgba(0, 0, 0, 0.02);
        }
        
        .input-hint {
            font-size: 0.95rem;
            color: var(--gray);
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #f8fafc, #f0f4f8);
            border-radius: 12px;
            border-left: 4px solid var(--accent);
        }
        
        .input-hint i {
            color: var(--accent);
            font-size: 1.2rem;
        }
        
        .quick-feelings {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 2.5rem;
        }
        
        .feeling-chip {
            background: linear-gradient(135deg, #f1f5f9, #e8f0fe);
            border: 2px solid transparent;
            border-radius: 50px;
            padding: 1rem 1.75rem;
            font-size: 1rem;
            color: var(--dark);
            cursor: pointer;
            transition: var(--transition);
            font-weight: 500;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
        }
        
        .feeling-chip:hover {
            background: var(--gradient);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .feeling-chip.active {
            background: var(--gradient);
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            transform: translateY(-2px);
        }
        
        .submit-btn {
            width: 100%;
            padding: 1.5rem;
            background: var(--gradient);
            color: white;
            border: none;
            border-radius: 16px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
        }
        
        .submit-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4);
        }
        
        .submit-btn:active {
            transform: translateY(-2px);
        }
        
        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }
        
        /* Loading Section */
        .loading-section {
            display: none;
            text-align: center;
            padding: 5rem 2rem;
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            margin-bottom: 3rem;
        }
        
        .loading-animation {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            position: relative;
        }
        
        .loading-dot {
            width: 20px;
            height: 20px;
            background: var(--primary);
            border-radius: 50%;
            position: absolute;
            animation: loading 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
        
        .loading-dot:nth-child(1) {
            top: 0;
            left: 40px;
            animation-delay: 0s;
        }
        
        .loading-dot:nth-child(2) {
            top: 15px;
            right: 15px;
            animation-delay: 0.2s;
        }
        
        .loading-dot:nth-child(3) {
            bottom: 0;
            right: 40px;
            animation-delay: 0.4s;
        }
        
        .loading-dot:nth-child(4) {
            bottom: 15px;
            left: 15px;
            animation-delay: 0.6s;
        }
        
        .loading-dot:nth-child(5) {
            top: 40px;
            left: 0;
            animation-delay: 0.8s;
        }
        
        .loading-text {
            font-size: 1.2rem;
            color: var(--gray);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .loading-text .dot {
            animation: dotPulse 1.5s infinite;
        }
        
        /* Response Section */
        .response-section {
            display: none;
            animation: slideUp 0.6s ease-out;
        }
        
        .response-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid #f1f5f9;
        }
        
        .response-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--dark);
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .response-title i {
            color: var(--accent);
            background: linear-gradient(135deg, #e8f0fe, #f0f7ff);
            padding: 12px;
            border-radius: 14px;
        }
        
        .response-actions {
            display: flex;
            gap: 1rem;
        }
        
        .action-btn {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 0.9rem 1.5rem;
            color: var(--gray);
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
        }
        
        .action-btn:hover {
            background: var(--gradient);
            color: white;
            border-color: var(--primary);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .response-card {
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            overflow: hidden;
            margin-bottom: 3rem;
            position: relative;
            border: 1px solid rgba(0, 0, 0, 0.02);
        }
        
        .response-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
        }
        
        .response-section-item {
            padding: 2.5rem;
            border-bottom: 1px solid #f1f5f9;
            position: relative;
            transition: var(--transition);
        }
        
        .response-section-item:hover {
            background: linear-gradient(135deg, #fafcff, #f8fafc);
        }
        
        .response-section-item:last-child {
            border-bottom: none;
        }
        
        .section-title {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 0.95rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--primary);
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #f1f5f9;
        }
        
        .section-icon {
            font-size: 1.3rem;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .section-content {
            font-size: 1.15rem;
            line-height: 1.8;
            color: var(--dark);
        }
        
        .section-content strong {
            color: var(--primary-dark);
            font-weight: 600;
        }
        
        /* Insight Sections */
        .insight-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .insight-card {
            background: linear-gradient(135deg, #f8fafc, #f0f4f8);
            border-radius: 16px;
            padding: 2rem;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.03);
        }
        
        .insight-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-hover);
            background: white;
        }
        
        .insight-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: var(--gradient);
        }
        
        .insight-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .insight-icon {
            background: var(--gradient);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 1.4rem;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }
        
        .insight-title {
            font-weight: 700;
            color: var(--primary-dark);
            font-size: 1.2rem;
        }
        
        .insight-content {
            color: var(--dark);
            line-height: 1.7;
        }
        
        /* Practice Section */
        .practice-section {
            background: linear-gradient(135deg, #e8f0fe, #f0f7ff);
            border-radius: 16px;
            padding: 2rem;
            margin-top: 2rem;
            border-left: 5px solid var(--accent);
            position: relative;
            overflow: hidden;
        }
        
        .practice-section::before {
            content: '';
            position: absolute;
            top: -50px;
            right: -50px;
            width: 100px;
            height: 100px;
            background: var(--accent);
            opacity: 0.1;
            border-radius: 50%;
        }
        
        .practice-title {
            font-weight: 700;
            color: var(--primary-dark);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.2rem;
        }
        
        .practice-content {
            color: var(--dark);
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        
        .practice-timer {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: white;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            color: var(--primary);
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
        }
        
        /* Key Points Section */
        .keypoints-section {
            padding: 2.5rem;
        }
        
        .keypoints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .keypoint-card {
            background: linear-gradient(135deg, #f8fafc, #f0f4f8);
            border-radius: 16px;
            padding: 2rem;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.03);
        }
        
        .keypoint-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-hover);
            background: white;
        }
        
        .keypoint-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .keypoint-icon {
            background: var(--gradient);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 1.4rem;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }
        
        .keypoint-title {
            font-weight: 700;
            color: var(--primary-dark);
            font-size: 1.2rem;
        }
        
        .keypoint-content {
            color: var(--dark);
            line-height: 1.7;
        }
        
        /* Detailed Response Styles */
        .detail-section {
            padding: 2.5rem;
        }
        
        .detail-item {
            margin-bottom: 3rem;
            padding-bottom: 3rem;
            border-bottom: 2px solid #f1f5f9;
            position: relative;
        }
        
        .detail-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-title {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .detail-icon {
            background: var(--gradient);
            color: white;
            width: 55px;
            height: 55px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 1.5rem;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }
        
        .detail-heading {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--primary-dark);
        }
        
        .detail-content {
            font-size: 1.15rem;
            line-height: 1.9;
            color: var(--dark);
        }
        
        /* Quote Section */
        .quote-section {
            background: var(--gradient);
            color: white;
            padding: 4rem 3rem;
            text-align: center;
            border-radius: var(--border-radius);
            margin: 3rem 0;
            position: relative;
            overflow: hidden;
        }
        
        .quote-section::before {
            content: '"';
            position: absolute;
            top: -30px;
            left: 30px;
            font-size: 150px;
            color: rgba(255, 255, 255, 0.1);
            font-family: Georgia, serif;
        }
        
        .quote-text {
            font-size: 1.8rem;
            font-style: italic;
            margin-bottom: 2rem;
            position: relative;
            z-index: 1;
            line-height: 1.5;
            font-weight: 300;
        }
        
        .quote-author {
            font-size: 1.1rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
            font-weight: 500;
        }
        
        /* Share Section */
        .share-section {
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, #f8fafc, #f0f4f8);
            border-radius: var(--border-radius);
            margin-bottom: 3rem;
        }
        
        .share-title {
            font-weight: 600;
            color: var(--primary-dark);
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
        }
        
        .share-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .share-btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1rem;
        }
        
        .share-btn.twitter {
            background: #1da1f2;
            color: white;
        }
        
        .share-btn.whatsapp {
            background: #25D366;
            color: white;
        }
        
        .share-btn.copy {
            background: var(--gradient);
            color: white;
        }
        
        .share-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        /* Footer */
        .app-footer {
            text-align: center;
            padding: 4rem 2rem 2rem;
            color: var(--gray);
            font-size: 0.95rem;
            margin-top: 5rem;
            border-top: 1px solid #e2e8f0;
            background: white;
        }
        
        .footer-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 2rem;
        }
        
        .footer-logo-icon {
            font-size: 32px;
            color: #00cc66;
            animation: float 6s ease-in-out infinite;
        }
        
        .footer-logo-text {
            font-size: 28px;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Playfair Display', serif;
        }
        
        .footer-tagline {
            font-size: 1.2rem;
            color: var(--gray);
            margin-bottom: 3rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        
        .social-link {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #f1f5f9, #e8f0fe);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            text-decoration: none;
            transition: var(--transition);
            font-size: 1.2rem;
        }
        
        .social-link:hover {
            background: var(--gradient);
            color: white;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .copyright {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .worldwide {
            margin-top: 1rem;
            font-size: 0.85rem;
            opacity: 0.8;
        }
        
        /* Modals */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .modal-content {
            background: white;
            border-radius: var(--border-radius);
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.4s ease-out;
            box-shadow: 0 25px 100px rgba(0, 0, 0, 0.15);
        }
        
        .modal-header {
            padding: 2rem;
            background: var(--gradient);
            color: white;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .modal-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            font-size: 1.5rem;
            color: white;
            cursor: pointer;
            padding: 0.5rem;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .modal-body {
            padding: 2.5rem;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes loading {
            0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
            50% { transform: scale(0.6); opacity: 0.5; box-shadow: 0 0 10px rgba(102, 126, 234, 0.3); }
        }
        
        @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes dotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        /* Dark Mode */
        .dark-mode {
            background: #0f172a;
            color: #f1f5f9;
        }
        
        .dark-mode .app-header {
            background: rgba(30, 41, 59, 0.98);
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        
        .dark-mode .input-card,
        .dark-mode .response-card,
        .dark-mode .keypoint-card,
        .dark-mode .insight-card,
        .dark-mode .loading-section {
            background: #1e293b;
            border-color: #334155;
        }
        
        .dark-mode .input-field {
            background: #334155;
            border-color: #475569;
            color: #f1f5f9;
        }
        
        .dark-mode .feeling-chip {
            background: #334155;
            border-color: #475569;
            color: #cbd5e1;
        }
        
        .dark-mode .feeling-chip.active,
        .dark-mode .feeling-chip:hover {
            background: var(--gradient);
            color: white;
        }
        
        .dark-mode .section-content,
        .dark-mode .detail-content,
        .dark-mode .keypoint-content,
        .dark-mode .insight-content {
            color: #e2e8f0;
        }
        
        .dark-mode .app-footer {
            background: #1e293b;
            border-top-color: #334155;
        }

/* Fix for modals in dark mode */
.dark-mode .modal {
    background: rgba(0, 0, 0, 0.7);
}

.dark-mode .modal-content {
    background: #1e293b;
    border: 1px solid #475569;
    color: #f1f5f9;
}

.dark-mode .modal-header {
    background: var(--gradient);
    color: white;
    border-bottom: 1px solid #475569;
}

.dark-mode .modal-body {
    background: #1e293b;
    color: #e2e8f9;
}

.dark-mode .info-item {
    border-bottom: 1px solid #334155;
    padding: 1.5rem 0;
}

.dark-mode .info-item:last-child {
    border-bottom: none;
}

.dark-mode .info-content h4 {
    color: #f1f5f9;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.dark-mode .info-content p {
    color: #cbd5e1;
    line-height: 1.6;
}

.dark-mode select {
    background: #334155;
    color: #f1f5f9;
    border-color: #475569;
}

.dark-mode select:focus {
    border-color: var(--primary);
    outline: none;
}

.dark-mode .modal-title {
    color: white;
}

.dark-mode .modal-close {
    color: white;
    background: rgba(255, 255, 255, 0.2);
}

.dark-mode .modal-close:hover {
    background: rgba(255, 255, 255, 0.3);
    color: white;
}

.dark-mode .trust-badge {
    background: #334155;
    border: 1px solid #475569;
    color: #e2e8f0;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}

.dark-mode .trust-badge:hover {
    background: #3c4b63;
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
}

.dark-mode .trust-badge i {
    color: var(--accent);
}

/* Also fix the input hint and practice section */
.dark-mode .input-hint {
    background: #334155;
    border-left: 4px solid var(--accent);
    color: #cbd5e1;
}

.dark-mode .practice-section {
    background: #334155;
    border-left: 5px solid var(--accent);
    color: #e2e8f0;
}

.dark-mode .practice-timer {
    background: #475569;
    color: var(--primary);
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}

/* Fix share section */
.dark-mode .share-section {
    background: #334155;
    color: #e2e8f0;
}

.dark-mode .share-title {
    color: #f1f5f9;
}

/* Fix quote section */
.dark-mode .quote-section {
    background: var(--gradient);
    color: white;
}

.dark-mode .quote-text {
    color: white;
}

.dark-mode .quote-author {
    color: rgba(255, 255, 255, 0.9);
}

/* Fix for settings modal specifically */
.dark-mode #settingsModal .modal-body {
    background: #1e293b;
}

.dark-mode #settingsModal select option {
    background: #1e293b;
    color: #f1f5f9;
}

/* Fix for info modal specifically */
.dark-mode #infoModal .info-icon {
    color: var(--accent);
    margin-right: 1rem;
    font-size: 1.2rem;
}

.dark-mode #infoModal .info-content {
    flex: 1;
}
/* ========== GENTLE PRACTICE SECTION IN DARK MODE ========== */

.dark-mode .practice-section {
    background: #2d3748;
    border-left: 5px solid var(--accent);
    color: #f7fafc;
}

.dark-mode .practice-title {
    color: #e2e8f0;
}

.dark-mode .practice-title i {
    color: var(--accent);
}

.dark-mode .practice-content {
    color: #e2e8f0;
}

.dark-mode .practice-timer {
    background: #4a5568;
    color: #cbd5e0;
    border: 1px solid #4a5568;
}

.dark-mode .practice-timer i {
    color: var(--accent);
}

/* Also fix the section titles in dark mode */
.dark-mode .section-title {
    color: #a0aec0;
    border-bottom-color: #4a5568;
}

.dark-mode .section-icon {
    color: var(--accent);
}

/* Fix the insight cards in dark mode */
.dark-mode .insight-card {
    background: #2d3748;
    border: 1px solid #4a5568;
}

.dark-mode .insight-card:hover {
    background: #374151;
    border-color: var(--primary);
}

.dark-mode .insight-title {
    color: #e2e8f0;
}

.dark-mode .insight-content {
    color: #cbd5e0;
}

/* Fix keypoint cards in dark mode */
.dark-mode .keypoint-card {
    background: #2d3748;
    border: 1px solid #4a5568;
}

.dark-mode .keypoint-card:hover {
    background: #374151;
    border-color: var(--primary);
}

.dark-mode .keypoint-title {
    color: #e2e8f0;
}

.dark-mode .keypoint-content {
    color: #cbd5e0;
}
        
        /* AI Rules Badge */
        .ai-rules-badge {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: 1rem;
            vertical-align: middle;
            box-shadow: 0 3px 15px rgba(102, 126, 234, 0.3);
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
            .hero-title {
                font-size: 2.8rem;
            }
            
            .insight-grid,
            .keypoints-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 768px) {
            .main-container {
                padding: 1.5rem;
            }
            
            .hero-title {
                font-size: 2.3rem;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
            }
            
            .input-card {
                padding: 2rem;
            }
            
            .response-section-item {
                padding: 2rem;
            }
            
            .header-container {
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .nav-actions {
                width: 100%;
                justify-content: space-between;
            }
            
            .length-selector {
                order: -1;
                width: 100%;
                justify-content: center;
            }
            
            .trust-badges {
                gap: 1rem;
            }
            
            .trust-badge {
                padding: 0.75rem 1rem;
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .hero-title {
                font-size: 2rem;
            }
            
            .input-card {
                padding: 1.5rem;
            }
            
            .response-header {
                flex-direction: column;
                gap: 1.5rem;
                align-items: flex-start;
            }
            
            .response-actions {
                width: 100%;
                justify-content: space-between;
            }
            
            .action-btn {
                padding: 0.75rem 1rem;
                font-size: 0.9rem;
            }
            
            .quote-text {
                font-size: 1.4rem;
            }
            
            .detail-heading {
                font-size: 1.2rem;
            }
        }
        
        /* Utility Classes */
        .hidden {
            display: none !important;
        }
        
        /* Watermark */
        .watermark {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.1);
            z-index: 100;
            pointer-events: none;
            font-family: monospace;
        }
        
        .dark-mode .watermark {
            color: rgba(255, 255, 255, 0.05);
        }
        
        /* Error Message */
        .error-message {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            margin: 1rem 0;
            display: none;
            align-items: center;
            gap: 10px;
            animation: fadeIn 0.3s ease-out;
        }
        
        .error-message i {
            font-size: 1.2rem;
        }
        
        .retry-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            margin-left: auto;
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .retry-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        /* API Status */
        .api-status {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 0.75rem 1rem;
            border-radius: 12px;
            font-size: 0.85rem;
            color: var(--success);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            display: none;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            border-left: 4px solid var(--success);
        }
        
        .api-status.error {
            color: #ff6b6b;
            border-left-color: #ff6b6b;
        }
        
        .api-status.connecting {
            color: var(--warning);
            border-left-color: var(--warning);
        }
        
        .dark-mode .api-status {
            background: rgba(30, 41, 59, 0.95);
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    </style>
</head>
<body>
    <!-- Watermark -->
    <div class="watermark">PAUSE v3.0 • Worldwide</div>
    
    <!-- API Status -->
    <div class="api-status" id="apiStatus"></div>
    
    <!-- Error Message -->
    <div class="error-message" id="errorMessage">
        <i class="fas fa-exclamation-triangle"></i>
        <span id="errorText"></span>
        <button class="retry-btn" id="retryBtn">Retry</button>
    </div>

    <!-- Header -->
    <header class="app-header">
        <div class="header-container">
            <a href="#" class="logo">
                <div class="logo-icon">🌿</div>
                <div class="logo-text">PAUSE</div>
            </a>
            <div class="nav-actions">
                <div class="length-selector">
                    <span class="length-label">Response:</span>
                    <div class="length-options">
                        <button class="length-option active" data-length="quick">Quick</button>
                        <button class="length-option" data-length="keypoints">Key Points</button>
                        <button class="length-option" data-length="detailed">Detailed</button>
                    </div>
                </div>
                <button class="nav-btn" id="infoBtn" title="Important Information">
                    <i class="fas fa-info-circle"></i>
                </button>
                <button class="nav-btn" id="themeToggle" title="Toggle theme">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="nav-btn" id="settingsBtn" title="Settings">
                    <i class="fas fa-cog"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-container">
        <!-- Hero Section -->
        <section class="hero-section">
            <h1 class="hero-title">Understand Your Emotions, Find Your Peace</h1>
            <p class="hero-subtitle">PAUSE helps you navigate complex feelings with gentle insight. No judgment, no tracking — just compassionate understanding that grows with you.</p>
            
            <div class="trust-badges">
                <div class="trust-badge">
                    <i class="fas fa-user-shield"></i>
                    <span>100% Private & Secure</span>
                </div>
                <div class="trust-badge">
                    <i class="fas fa-brain"></i>
                    <span>AI-Powered Insights</span>
                </div>
                <div class="trust-badge">
                    <i class="fas fa-globe"></i>
                    <span>Available Worldwide</span>
                </div>
            </div>
        </section>

        <!-- Input Section -->
        <section class="input-card" id="inputSection">
            <label class="input-label">What's alive in you right now?</label>
            <input 
                type="text" 
                class="input-field" 
                id="feelingInput" 
                placeholder="Try: 'I feel overwhelmed', 'Anxious about tomorrow', 'A quiet sadness', 'Joy bubbling up'"
                autocomplete="off"
                maxlength="200"
            >
            
            <div class="input-hint">
                <i class="fas fa-lightbulb"></i>
                <span>No right or wrong answers. Emotions are messengers — let's listen together.</span>
            </div>
            
            <div class="quick-feelings" id="quickFeelingsContainer">
                <!-- Populated by JavaScript -->
            </div>
            
            <button class="submit-btn" id="submitBtn">
                <i class="fas fa-search-heart"></i>
                <span id="submitBtnText">Explore This Feeling</span>
            </button>
        </section>

        <!-- Loading Section -->
        <section class="loading-section" id="loadingSection">
            <div class="loading-animation">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
            <p class="loading-text" id="loadingText">Crafting your personalized insight<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>
        </section>

        <!-- Response Section (Quick) -->
        <section class="response-section" id="responseSectionQuick">
            <div class="response-header">
                <h2 class="response-title">
                    <i class="fas fa-brain"></i>
                    <span id="responseTitleQuick">Your Emotional Insight</span>
                    <span class="ai-rules-badge"><i class="fas fa-robot"></i> AI Insight</span>
                </h2>
                <div class="response-actions">
                    <button class="action-btn" id="printBtnQuick">
                        <i class="fas fa-print"></i>
                        <span>Print</span>
                    </button>
                    <button class="action-btn" id="saveBtnQuick">
                        <i class="fas fa-bookmark"></i>
                        <span>Save</span>
                    </button>
                </div>
            </div>
            
            <div class="response-card">
                <!-- Core Insight -->
                <div class="response-section-item">
                    <div class="section-title">
                        <i class="fas fa-heartbeat section-icon"></i>
                        <span>What's Happening Now</span>
                    </div>
                    <div class="section-content" id="whatsHappeningContentQuick"></div>
                </div>
                
                <!-- Evolutionary Insight -->
                <div class="response-section-item">
                    <div class="section-title">
                        <i class="fas fa-history section-icon"></i>
                        <span>Why We Feel This Way</span>
                    </div>
                    <div class="section-content" id="whyLearnedContentQuick"></div>
                </div>
                
                <!-- Deep Insight Grid -->
                <div class="response-section-item">
                    <div class="section-title">
                        <i class="fas fa-lightbulb section-icon"></i>
                        <span>Key Insights</span>
                    </div>
                    <div class="insight-grid">
                        <div class="insight-card" id="insightBelief">
                            <div class="insight-header">
                                <div class="insight-icon">
                                    <i class="fas fa-question-circle"></i>
                                </div>
                                <div class="insight-title">Thought to Explore</div>
                            </div>
                            <div class="insight-content" id="beliefCheckContentQuick"></div>
                        </div>
                        
                        <div class="insight-card" id="insightPattern">
                            <div class="insight-header">
                                <div class="insight-icon">
                                    <i class="fas fa-wave-square"></i>
                                </div>
                                <div class="insight-title">Emotional Pattern</div>
                            </div>
                            <div class="insight-content" id="patternContentQuick"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Gentle Practice -->
                <div class="response-section-item">
                    <div class="section-title">
                        <i class="fas fa-hands-helping section-icon"></i>
                        <span>Gentle Practice</span>
                    </div>
                    <div class="practice-section">
                        <div class="practice-title">
                            <i class="fas fa-anchor"></i>
                            <span>5-Second Practice</span>
                        </div>
                        <div class="practice-content" id="practiceContentQuick"></div>
                        <div class="practice-timer">
                            <i class="fas fa-clock"></i>
                            <span>Just 5 seconds</span>
                        </div>
                    </div>
                </div>
                
                <!-- Science Insight -->
                <div class="response-section-item">
                    <div class="section-title">
                        <i class="fas fa-flask section-icon"></i>
                        <span>Simple Science</span>
                    </div>
                    <div class="section-content" id="simpleScienceContentQuick"></div>
                </div>
            </div>
            
            <!-- Quote Section -->
            <div class="quote-section">
                <p class="quote-text" id="quoteText"></p>
                <p class="quote-author" id="quoteAuthor"></p>
            </div>
            
            <!-- Share Section -->
            <div class="share-section">
                <div class="share-title">Found this helpful? Share the insight</div>
                <div class="share-buttons">
                    <button class="share-btn twitter" id="shareTwitter">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="share-btn whatsapp" id="shareWhatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </button>
                    <button class="share-btn copy" id="copyInsight">
                        <i class="fas fa-copy"></i>
                        <span>Copy Insight</span>
                    </button>
                </div>
            </div>
            
            <button class="submit-btn" id="newFeelingBtnQuick">
                <i class="fas fa-plus-circle"></i>
                <span>Explore Another Feeling</span>
            </button>
        </section>

        <!-- Response Section (Key Points) -->
        <section class="response-section" id="responseSectionKeypoints">
            <div class="response-header">
                <h2 class="response-title">
                    <i class="fas fa-key"></i>
                    <span id="responseTitleKeypoints">Key Insights</span>
                    <span class="ai-rules-badge"><i class="fas fa-robot"></i> AI Insight</span>
                </h2>
                <div class="response-actions">
                    <button class="action-btn" id="printBtnKeypoints">
                        <i class="fas fa-print"></i>
                        <span>Print</span>
                    </button>
                    <button class="action-btn" id="saveBtnKeypoints">
                        <i class="fas fa-bookmark"></i>
                        <span>Save</span>
                    </button>
                </div>
            </div>
            
            <div class="response-card">
                <div class="keypoints-section">
                    <div class="keypoints-grid">
                        <div class="keypoint-card" id="keypointPattern">
                            <div class="keypoint-header">
                                <div class="keypoint-icon">
                                    <i class="fas fa-brain"></i>
                                </div>
                                <div class="keypoint-title">The Pattern</div>
                            </div>
                            <div class="keypoint-content" id="keypointPatternContent"></div>
                        </div>
                        
                        <div class="keypoint-card" id="keypointMeaning">
                            <div class="keypoint-header">
                                <div class="keypoint-icon">
                                    <i class="fas fa-lightbulb"></i>
                                </div>
                                <div class="keypoint-title">What It Means</div>
                            </div>
                            <div class="keypoint-content" id="keypointMeaningContent"></div>
                        </div>
                        
                        <div class="keypoint-card" id="keypointPractice">
                            <div class="keypoint-header">
                                <div class="keypoint-icon">
                                    <i class="fas fa-hands-helping"></i>
                                </div>
                                <div class="keypoint-title">Gentle Practice</div>
                            </div>
                            <div class="keypoint-content" id="keypointPracticeContent"></div>
                        </div>
                        
                        <div class="keypoint-card" id="keypointAwareness">
                            <div class="keypoint-header">
                                <div class="keypoint-icon">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="keypoint-title">Awareness Moment</div>
                            </div>
                            <div class="keypoint-content" id="keypointAwarenessContent"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quote Section -->
            <div class="quote-section">
                <p class="quote-text" id="quoteTextKeypoints"></p>
                <p class="quote-author" id="quoteAuthorKeypoints"></p>
            </div>
            
            <button class="submit-btn" id="newFeelingBtnKeypoints">
                <i class="fas fa-plus-circle"></i>
                <span>Explore Another Feeling</span>
            </button>
        </section>

        <!-- Response Section (Detailed) -->
        <section class="response-section" id="responseSectionDetailed">
            <div class="response-header">
                <h2 class="response-title">
                    <i class="fas fa-book-open"></i>
                    <span id="responseTitleDetailed">Deep Insight</span>
                    <span class="ai-rules-badge"><i class="fas fa-robot"></i> AI Insight</span>
                </h2>
                <div class="response-actions">
                    <button class="action-btn" id="printBtnDetailed">
                        <i class="fas fa-print"></i>
                        <span>Print</span>
                    </button>
                    <button class="action-btn" id="saveBtnDetailed">
                        <i class="fas fa-bookmark"></i>
                        <span>Save</span>
                    </button>
                </div>
            </div>
            
            <div class="response-card">
                <div class="detail-section">
                    <div class="detail-item" id="detailPattern">
                        <div class="detail-title">
                            <div class="detail-icon">
                                <i class="fas fa-brain"></i>
                            </div>
                            <div class="detail-heading">Understanding This Feeling</div>
                        </div>
                        <div class="detail-content" id="detailPatternContent"></div>
                    </div>
                    
                    <div class="detail-item" id="detailOrigin">
                        <div class="detail-title">
                            <div class="detail-icon">
                                <i class="fas fa-history"></i>
                            </div>
                            <div class="detail-heading">Evolutionary Wisdom</div>
                        </div>
                        <div class="detail-content" id="detailOriginContent"></div>
                    </div>
                    
                    <div class="detail-item" id="detailMeaning">
                        <div class="detail-title">
                            <div class="detail-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <div class="detail-heading">What This Might Be Telling You</div>
                        </div>
                        <div class="detail-content" id="detailMeaningContent"></div>
                    </div>
                    
                    <div class="detail-item" id="detailPractice">
                        <div class="detail-title">
                            <div class="detail-icon">
                                <i class="fas fa-hands-helping"></i>
                            </div>
                            <div class="detail-heading">Gentle Approaches</div>
                        </div>
                        <div class="detail-content" id="detailPracticeContent"></div>
                    </div>
                    
                    <div class="detail-item" id="detailScience">
                        <div class="detail-title">
                            <div class="detail-icon">
                                <i class="fas fa-flask"></i>
                            </div>
                            <div class="detail-heading">The Science Behind It</div>
                        </div>
                        <div class="detail-content" id="detailScienceContent"></div>
                    </div>
                </div>
            </div>
            
            <!-- Quote Section -->
            <div class="quote-section">
                <p class="quote-text" id="quoteTextDetailed"></p>
                <p class="quote-author" id="quoteAuthorDetailed"></p>
            </div>
            
            <button class="submit-btn" id="newFeelingBtnDetailed">
                <i class="fas fa-plus-circle"></i>
                <span>Explore Another Feeling</span>
            </button>
        </section>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
        <div class="footer-logo">
            <div class="footer-logo-icon">🌿</div>
            <div class="footer-logo-text">PAUSE</div>
        </div>
        
        <p class="footer-tagline">Emotional intelligence for everyone. A private space to understand your feelings without judgment or data collection.</p>
        
        <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-link" aria-label="GitHub">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-link" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:hello@pauseapp.com" class="social-link" aria-label="Email">
                <i class="fas fa-envelope"></i>
            </a>
        </div>
        
        <div class="copyright">
            <p>© 2024 PAUSE. All Rights Reserved.</p>
            <p class="worldwide">Made with ❤️ for emotional wellbeing across cultures and languages</p>
            <p style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.7;">
                Open Source on <a href="https://github.com" style="color: var(--primary); text-decoration: none;">GitHub</a>
            </p>
        </div>
    </footer>

    <!-- Info Modal -->
    <div class="modal" id="infoModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-shield-alt"></i>
                    Our Privacy Promise
                </h3>
                <button class="modal-close" id="closeInfo">&times;</button>
            </div>
            <div class="modal-body">
                <div class="info-item">
                    <div class="info-icon">
                        <i class="fas fa-user-secret"></i>
                    </div>
                    <div class="info-content">
                        <h4>Complete Privacy</h4>
                        <p>Your feelings never leave your device. No accounts, no tracking, no data collection. Everything happens locally in your browser.</p>
                    </div>
                </div>
                
                <div class="info-item">
                    <div class="info-icon">
                        <i class="fas fa-brain"></i>
                    </div>
                    <div class="info-content">
                        <h4>No Memory, No History</h4>
                        <p>We don't remember your previous sessions. Each visit is fresh - your emotional journey belongs only to you.</p>
                    </div>
                </div>
                
                <div class="info-item">
                    <div class="info-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="info-content">
                        <h4>Understanding, Not Fixing</h4>
                        <p>We offer insight, not solutions. Emotions are valid experiences, not problems to solve.</p>
                    </div>
                </div>
                
                <div class="info-item">
                    <div class="info-icon">
                        <i class="fas fa-stethoscope"></i>
                    </div>
                    <div class="info-content">
                        <h4>Not Medical Advice</h4>
                        <p>PAUSE is for emotional understanding. For clinical support, please consult a healthcare professional.</p>
                    </div>
                </div>
                
                <div class="info-item">
                    <div class="info-icon">
                        <i class="fas fa-globe"></i>
                    </div>
                    <div class="info-content">
                        <h4>Global Accessibility</h4>
                        <p>Works offline, needs minimal bandwidth. Available to everyone, everywhere, regardless of resources.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Settings Modal -->
    <div class="modal" id="settingsModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-cog"></i>
                    Settings & Preferences
                </h3>
                <button class="modal-close" id="closeSettings">&times;</button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; margin-bottom: 0.75rem; font-weight: 600; color: var(--primary-dark);">Default Response Length</label>
                    <select id="responseLengthSelect" style="width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 12px; background: white; color: var(--dark); font-size: 1rem;">
                        <option value="quick">Quick Insight (Daily check-ins)</option>
                        <option value="keypoints">Key Points (Pattern understanding)</option>
                        <option value="detailed">Deep Insight (Full exploration)</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; margin-bottom: 0.75rem; font-weight: 600; color: var(--primary-dark);">Theme Preference</label>
                    <select id="themeSelect" style="width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 12px; background: white; color: var(--dark); font-size: 1rem;">
                        <option value="light">Light Mode (Daytime use)</option>
                        <option value="dark">Dark Mode (Evening comfort)</option>
                        <option value="auto">Auto (Follow system)</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; margin-bottom: 0.75rem; font-weight: 600; color: var(--primary-dark);">Insight Depth</label>
                    <select id="insightDepthSelect" style="width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 12px; background: white; color: var(--dark); font-size: 1rem;">
                        <option value="gentle">Gentle (Compassionate)</option>
                        <option value="balanced">Balanced (Insightful)</option>
                        <option value="detailed">Detailed (Comprehensive)</option>
                    </select>
                </div>
                
                <button class="submit-btn" id="saveSettingsBtn" style="margin-top: 1rem;">
                    <i class="fas fa-save"></i>
                    <span>Save Preferences</span>
                </button>
            </div>
        </div>
    </div>

    <script>
        // ==================== CONFIGURATION ====================
        const CONFIG = {
            // Backend URL - CRITICAL FIX: Match your actual Render backend URL
            API_URL: 'https://pause-backend-2.onrender.com/api/analyze-feeling',
            // Set to false to use only local responses (works offline)
            USE_BACKEND: true,
            // Timeout for backend requests (milliseconds)
            TIMEOUT: 30000,
            // Version
            VERSION: '3.0'
        };

        // ==================== LOCAL RESPONSES (Fallback) ====================
        const LOCAL_RESPONSES = {
            anxious: {
                quick: {
                    whats_happening: "Your nervous system is scanning the horizon—not for danger, but for what matters. This energy rises to meet what's coming, even when the path isn't clear.",
                    why_learned: "Ancestors needed to anticipate storms and predators. Your body remembers this wisdom, applying it to deadlines, conversations, and unknowns.",
                    belief: "What if this anxiety isn't about preventing disaster, but about caring deeply?",
                    pattern: "Energy gathers in your chest and throat—a preparation system activating. Thoughts move like weather patterns, shifting and reforming.",
                    practice: "Place one hand on your sternum. Breathe naturally. Notice the rise and fall for three breaths.",
                    science: "Your amygdala activates ancient pathways designed for protection. Cortisol rises briefly—a temporary visitor, not a permanent resident."
                },
                keypoints: {
                    pattern: "Anticipatory energy—your system preparing for what might matter.",
                    meaning: "Often signals: 'This is important' or 'I care about this outcome.'",
                    practice: "Name it gently: 'Preparation energy is here.' Return to one complete breath.",
                    awareness: "Notice when future possibilities feel more real than your feet on the ground."
                },
                detailed: {
                    pattern: "Anxiety is future-oriented energy seeking certainty in an uncertain world. It's your ancient threat detection system applying millennia of survival wisdom to modern complexity.",
                    origin: "For 200,000 years, humans survived by anticipating danger. Your nervous system carries this legacy, now interpreting emails and conversations through ancient survival filters.",
                    meaning: "This feeling might be saying: 'My care is activated' or 'Something here holds meaning worth protecting.'",
                    practice: "When anxiety visits, try the RAIN method: Recognize it's here, Allow it space, Investigate where it lives in your body, Nurture with a hand on your heart.",
                    science: "Involves coordinated activation of amygdala (fear center), hippocampus (memory), and prefrontal cortex (planning). This temporary alignment served survival—now serves your humanity."
                }
            },
            overwhelmed: {
                quick: {
                    whats_happening: "Your mental landscape feels like too many windows open at once. Each tab represents something that matters—and together, they exceed your screen size.",
                    why_learned: "Ancient humans managed fire, food, shelter, and threats simultaneously. Your brain uses similar systems for modern multitasking.",
                    belief: "What if overwhelm isn't about capacity, but about clarity?",
                    pattern: "Thoughts scatter like leaves in wind. Priorities blur. Mental RAM fills beyond comfortable limits.",
                    practice: "Close your eyes. Count backwards from five. Open them with intention for just one thing.",
                    science: "Your prefrontal cortex manages 4-7 active thoughts optimally. Modern life often presents 20+—a design limitation meeting modern complexity."
                },
                keypoints: {
                    pattern: "Cognitive saturation—too many meaningful inputs competing for attention.",
                    meaning: "Signals: 'These all matter' or 'I need clearer boundaries.'",
                    practice: "Choose one small action. Complete it fully before considering another.",
                    awareness: "Notice when you're trying to process multiple complex thoughts simultaneously."
                },
                detailed: {
                    pattern: "Overwhelm occurs when cognitive demands exceed processing bandwidth—an intelligent system saying 'simplify and focus' rather than 'you're failing.'",
                    origin: "Our ancestors balanced immediate survival needs with longer-term planning. Your brain uses similar architecture for emails, relationships, and aspirations.",
                    meaning: "This might indicate: 'My values are distributed too thinly' or 'Clarity would help more than capacity.'",
                    practice: "Try the 'one page' method: Write everything on your mind. Circle three priorities. Let the rest exist on paper instead of in mental space.",
                    science: "Working memory limitations trigger stress responses. This temporary state often shifts with single-tasking and intentional space creation."
                }
            },
            sad: {
                quick: {
                    whats_happening: "Your emotional system is processing depth—like water seeking its own level. This slowing down allows meaning to settle where it needs to.",
                    why_learned: "Tears signaled need for community. Slowing down conserved energy during hardship. Your sadness carries this ancient wisdom.",
                    belief: "What if sadness honors what has depth rather than indicates deficiency?",
                    pattern: "Energy settles inward—chest feels like a weighted blanket, movements deliberate, world seems filtered through soft light.",
                    practice: "Place both hands over your heart. Feel three heartbeats without changing anything.",
                    science: "Specific brain networks activate for processing meaningful experience—part of being human, not pathology."
                },
                keypoints: {
                    pattern: "Meaning integration—your system processing what matters deeply.",
                    meaning: "Often accompanies: 'This had significance' or 'Change is happening here.'",
                    practice: "Acknowledge quietly: 'Something meaningful is being honored.'",
                    awareness: "Notice if you're resisting the natural movement of this feeling."
                },
                detailed: {
                    pattern: "Sadness is the emotional gravity that pulls meaning toward integration—it's not about loss alone, but about the significance of what was or what might have been.",
                    origin: "Evolutionarily, sadness conserved energy during famine or loss, signaled need for support, and deepened social bonds through shared experience.",
                    meaning: "This might be saying: 'This mattered' or 'Something meaningful is transitioning.'",
                    practice: "Create gentle space without expectation. Light a candle, write three honest words, or simply sit with the feeling as it is.",
                    science: "Activates brain regions for memory integration (hippocampus), social cognition (temporal lobe), and emotional processing (insula). Increases cytokines that sometimes promote connection-seeking."
                }
            },
            happy: {
                quick: {
                    whats_happening: "Your reward system celebrates alignment—like sunlight finding a clear path through leaves. This reinforcement says 'this connects to what matters.'",
                    why_learned: "Joy reinforced finding food, forming bonds, and achieving goals. Your happiness continues this life-affirming legacy.",
                    belief: "What if happiness can simply be received without pressure to sustain or analyze?",
                    pattern: "Energy lightens and expands—smile emerges without command, breathing deepens naturally, perception brightens.",
                    practice: "Pause. Notice this feeling in your body. Receive it fully for one complete breath.",
                    science: "Dopamine and serotonin activate—natural neurochemicals reinforcing beneficial experiences and connections."
                },
                keypoints: {
                    pattern: "Alignment celebration—your system recognizing beneficial connection.",
                    meaning: "Signals: 'This fits' or 'Connection happens here.'",
                    practice: "Let it be what it is without analysis or clinging.",
                    awareness: "Notice how this feeling lives in your body right now."
                },
                detailed: {
                    pattern: "Happiness reinforces behaviors and connections that support wellbeing—it's nature's feedback system saying 'this nourishes life.'",
                    origin: "Evolutionarily reinforced survival-enhancing activities: finding resources, forming alliances, reproducing, achieving goals. Your joy remembers this wisdom.",
                    meaning: "Might be saying: 'This aligns with life' or 'Connection happens authentically here.'",
                    practice: "Enjoy without clinging. Happiness is most authentic when allowed its natural rhythm of rising, lingering, and receding.",
                    science: "Multiple brain regions coordinate (ventral striatum, prefrontal cortex, amygdala modulation) creating positive experience. Correlates with resilience, immune function, and social bonding."
                }
            }
        };

        // ==================== APP STATE ====================
        let currentResponseLength = 'quick';
        let currentTheme = 'light';
        let lastFeeling = '';
        let isOnline = navigator.onLine;

        // ==================== DOM ELEMENTS ====================
        const elements = {
            // Sections
            inputSection: document.getElementById('inputSection'),
            loadingSection: document.getElementById('loadingSection'),
            responseSections: {
                quick: document.getElementById('responseSectionQuick'),
                keypoints: document.getElementById('responseSectionKeypoints'),
                detailed: document.getElementById('responseSectionDetailed')
            },
            
            // Input
            feelingInput: document.getElementById('feelingInput'),
            submitBtn: document.getElementById('submitBtn'),
            quickFeelingsContainer: document.getElementById('quickFeelingsContainer'),
            
            // Error/Status
            errorMessage: document.getElementById('errorMessage'),
            errorText: document.getElementById('errorText'),
            retryBtn: document.getElementById('retryBtn'),
            apiStatus: document.getElementById('apiStatus'),
            
            // Modals
            infoModal: document.getElementById('infoModal'),
            settingsModal: document.getElementById('settingsModal'),
            
            // Buttons
            infoBtn: document.getElementById('infoBtn'),
            closeInfo: document.getElementById('closeInfo'),
            settingsBtn: document.getElementById('settingsBtn'),
            closeSettings: document.getElementById('closeSettings'),
            saveSettingsBtn: document.getElementById('saveSettingsBtn'),
            themeToggle: document.getElementById('themeToggle'),
            
            // Settings
            responseLengthSelect: document.getElementById('responseLengthSelect'),
            themeSelect: document.getElementById('themeSelect'),
            insightDepthSelect: document.getElementById('insightDepthSelect'),
            
            // Length selector
            lengthOptions: document.querySelectorAll('.length-option'),
            
            // Share buttons
            shareTwitter: document.getElementById('shareTwitter'),
            shareWhatsapp: document.getElementById('shareWhatsapp'),
            copyInsight: document.getElementById('copyInsight')
        };

        // ==================== INITIALIZATION ====================
        function initApp() {
            console.log(`🌿 PAUSE v${CONFIG.VERSION} - Initializing...`);
            
            loadPreferences();
            setupEventListeners();
            populateQuickFeelings();
            setupShareButtons();
            
            // Set initial quotes
            setRandomQuote('');
            setRandomQuote('Keypoints');
            setRandomQuote('Detailed');
            
            elements.feelingInput.focus();
            
            // Check connectivity
            updateConnectivityStatus();
            
            // Listen for online/offline events
            window.addEventListener('online', updateConnectivityStatus);
            window.addEventListener('offline', updateConnectivityStatus);
            
            console.log('✅ PAUSE Ready');
        }

        function updateConnectivityStatus() {
            isOnline = navigator.onLine;
            if (isOnline && CONFIG.USE_BACKEND) {
                showApiStatus('Connected to AI insights', 'success');
            } else if (!isOnline) {
                showApiStatus('Offline - using local insights', 'connecting');
            } else {
                showApiStatus('Using enhanced local mode', 'connecting');
            }
        }

        // ==================== PREFERENCE MANAGEMENT ====================
        function loadPreferences() {
            currentResponseLength = localStorage.getItem('responseLength') || 'quick';
            currentTheme = localStorage.getItem('theme') || getSystemTheme();
            
            applyTheme(currentTheme);
            setResponseLength(currentResponseLength);
            
            if (elements.responseLengthSelect) elements.responseLengthSelect.value = currentResponseLength;
            if (elements.themeSelect) elements.themeSelect.value = currentTheme;
        }
        
        function savePreferences() {
            localStorage.setItem('responseLength', currentResponseLength);
            localStorage.setItem('theme', elements.themeSelect.value);
            localStorage.setItem('insightDepth', elements.insightDepthSelect.value);
            
            applyTheme(elements.themeSelect.value);
            closeModal(elements.settingsModal);
            showNotification('Preferences saved');
        }
        
        function getSystemTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        function applyTheme(theme) {
            if (theme === 'dark' || (theme === 'auto' && getSystemTheme() === 'dark')) {
                document.body.classList.add('dark-mode');
                if (elements.themeToggle) elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                currentTheme = 'dark';
            } else {
                document.body.classList.remove('dark-mode');
                if (elements.themeToggle) elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                currentTheme = 'light';
            }
        }

        // ==================== QUICK FEELINGS ====================
        function populateQuickFeelings() {
            const container = elements.quickFeelingsContainer;
            if (!container) return;
            
            container.innerHTML = '';
            
            const feelings = [
                { text: 'Anxious', emoji: '🌀' },
                { text: 'Overwhelmed', emoji: '🌊' },
                { text: 'Sad', emoji: '☔️' },
                { text: 'Angry', emoji: '🌋' },
                { text: 'Numb', emoji: '❄️' },
                { text: 'Lonely', emoji: '🏝️' },
                { text: 'Tired', emoji: '🌙' },
                { text: 'Happy', emoji: '🌈' },
                { text: 'Confused', emoji: '🌀' },
                { text: 'Hopeful', emoji: '🌱' }
            ];
            
            feelings.forEach(({ text, emoji }) => {
                const chip = document.createElement('div');
                chip.className = 'feeling-chip';
                chip.dataset.feeling = text.toLowerCase().replace(/\s+/g, '');
                chip.innerHTML = `${emoji} ${text}`;
                chip.addEventListener('click', () => {
                    document.querySelectorAll('.feeling-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    elements.feelingInput.value = text;
                    elements.feelingInput.focus();
                });
                container.appendChild(chip);
            });
        }

        // ==================== RESPONSE MANAGEMENT ====================
        function setResponseLength(length) {
            currentResponseLength = length;
            
            elements.lengthOptions.forEach(option => {
                option.classList.remove('active');
                if (option.dataset.length === length) {
                    option.classList.add('active');
                }
            });
        }
        
        async function analyzeFeeling(feeling, length) {
            console.log(`🤖 Analyzing: "${feeling}" (${length})`);
            
            // Always try backend if enabled and online
            if (CONFIG.USE_BACKEND && isOnline) {
                try {
                    const backendResponse = await callBackend(feeling, length);
                    if (backendResponse && backendResponse.success) {
                        return backendResponse;
                    }
                } catch (error) {
                    console.log('Backend failed, using local response');
                }
            }
            
            // Fallback to local response
            return getLocalResponse(feeling, length);
        }
        
        async function callBackend(feeling, length) {
            console.log('📡 Calling backend:', CONFIG.API_URL);
            
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
                
                const response = await fetch(CONFIG.API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        feeling: feeling,
                        length: length || 'quick'
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`Backend error: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('✅ Backend response received');
                return data;
                
            } catch (error) {
                console.error('❌ Backend call failed:', error.message);
                throw error;
            }
        }
        
        function getLocalResponse(feeling, length) {
            const feelingLower = feeling.toLowerCase();
            let matchedFeeling = 'anxious'; // Default
            
            if (feelingLower.includes('overwhelm') || feelingLower.includes('busy')) {
                matchedFeeling = 'overwhelmed';
            } else if (feelingLower.includes('sad') || feelingLower.includes('down')) {
                matchedFeeling = 'sad';
            } else if (feelingLower.includes('angry') || feelingLower.includes('mad')) {
                matchedFeeling = 'angry';
            } else if (feelingLower.includes('happy') || feelingLower.includes('joy')) {
                matchedFeeling = 'happy';
            } else if (feelingLower.includes('tired') || feelingLower.includes('exhaust')) {
                matchedFeeling = 'tired';
            }
            
            return {
                success: true,
                data: LOCAL_RESPONSES[matchedFeeling]?.[length] || LOCAL_RESPONSES.anxious[length],
                source: 'local',
                matched_feeling: matchedFeeling
            };
        }

        // ==================== RESPONSE RENDERING ====================
        async function renderResponse(feeling, responseData, length = currentResponseLength) {
            // Hide all response sections
            Object.values(elements.responseSections).forEach(section => {
                if (section) section.style.display = 'none';
            });
            
            // Show the selected response section
            const responseSection = elements.responseSections[length];
            if (responseSection) {
                responseSection.style.display = 'block';
            }
            
            // Get the response data
            const response = responseData.data || responseData;
            
            // Render based on length
            if (length === 'quick') {
                renderQuickResponse(response);
            } else if (length === 'keypoints') {
                renderKeypointsResponse(response);
            } else if (length === 'detailed') {
                renderDetailedResponse(response);
            }
            
            // Update share data
            updateShareData(feeling, response);
            
            // Set random quote
            setRandomQuote(length === 'keypoints' ? 'Keypoints' : (length === 'detailed' ? 'Detailed' : ''));
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function renderQuickResponse(response) {
            if (!response) return;
            
            const elementsToUpdate = {
                'whatsHappeningContentQuick': response.whats_happening,
                'whyLearnedContentQuick': response.why_learned,
                'beliefCheckContentQuick': response.belief,
                'patternContentQuick': response.pattern,
                'practiceContentQuick': response.practice,
                'simpleScienceContentQuick': response.science
            };
            
            for (const [id, content] of Object.entries(elementsToUpdate)) {
                const element = document.getElementById(id);
                if (element && content) {
                    element.textContent = content;
                }
            }
        }
        
        function renderKeypointsResponse(response) {
            if (!response) return;
            
            const elementsToUpdate = {
                'keypointPatternContent': response.pattern,
                'keypointMeaningContent': response.meaning,
                'keypointPracticeContent': response.practice,
                'keypointAwarenessContent': response.awareness
            };
            
            for (const [id, content] of Object.entries(elementsToUpdate)) {
                const element = document.getElementById(id);
                if (element && content) {
                    element.textContent = content;
                }
            }
        }
        
        function renderDetailedResponse(response) {
            if (!response) return;
            
            const elementsToUpdate = {
                'detailPatternContent': response.pattern,
                'detailOriginContent': response.origin,
                'detailMeaningContent': response.meaning,
                'detailPracticeContent': response.practice,
                'detailScienceContent': response.science
            };
            
            for (const [id, content] of Object.entries(elementsToUpdate)) {
                const element = document.getElementById(id);
                if (element && content) {
                    element.textContent = content;
                }
            }
        }

        // ==================== QUOTE MANAGEMENT ====================
        const quotes = [
            {
                text: "The curious paradox is that when I accept myself just as I am, then I can change.",
                author: "Carl Rogers"
            },
            {
                text: "Feelings are just visitors. Let them come and go.",
                author: "Mooji"
            },
            {
                text: "Your heart knows the way. Run in that direction.",
                author: "Rumi"
            },
            {
                text: "We cannot selectively numb emotions. When we numb the painful emotions, we also numb the positive emotions.",
                author: "Brené Brown"
            },
            {
                text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
                author: "Ralph Waldo Emerson"
            }
        ];
        
        function getRandomQuote() {
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
        
        function setRandomQuote(sectionId) {
            const quote = getRandomQuote();
            const suffix = sectionId ? sectionId : '';
            const quoteText = document.getElementById(`quoteText${suffix}`);
            const quoteAuthor = document.getElementById(`quoteAuthor${suffix}`);
            
            if (quoteText) quoteText.textContent = `"${quote.text}"`;
            if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
        }

        // ==================== SHARE FUNCTIONALITY ====================
        function setupShareButtons() {
            if (elements.shareTwitter) {
                elements.shareTwitter.addEventListener('click', shareOnTwitter);
            }
            if (elements.shareWhatsapp) {
                elements.shareWhatsapp.addEventListener('click', shareOnWhatsApp);
            }
            if (elements.copyInsight) {
                elements.copyInsight.addEventListener('click', copyInsightToClipboard);
            }
        }
        
        function updateShareData(feeling, response) {
            window.currentInsight = {
                feeling: feeling,
                response: response,
                timestamp: new Date().toISOString()
            };
        }
        
        function shareOnTwitter() {
            const feeling = elements.feelingInput.value;
            const text = `Understanding my feelings with PAUSE 🌿\n\n"${feeling}"\n\nTry it at: ${window.location.href}\n\n#EmotionalIntelligence #PAUSEApp`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }
        
        function shareOnWhatsApp() {
            const feeling = elements.feelingInput.value;
            const text = `I just explored my feelings with PAUSE 🌿\n\nFeeling: ${feeling}\n\nTry it: ${window.location.href}`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }
        
        function copyInsightToClipboard() {
            const feeling = elements.feelingInput.value;
            const responseCard = document.querySelector('.response-card');
            const insightText = responseCard ? responseCard.innerText : '';
            const text = `PAUSE Insight 🌿\n\nFeeling: ${feeling}\n\n${insightText}\n\nTry PAUSE: ${window.location.href}`;
            
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Insight copied to clipboard!');
            }).catch(() => {
                showNotification('Failed to copy. Please try again.');
            });
        }

        // ==================== UI CONTROLS ====================
        function showResponseSection() {
            if (elements.inputSection) elements.inputSection.style.display = 'none';
            if (elements.loadingSection) elements.loadingSection.style.display = 'none';
        }
        
        function showInputSection() {
            if (elements.inputSection) elements.inputSection.style.display = 'block';
            if (elements.loadingSection) elements.loadingSection.style.display = 'none';
            
            // Hide all response sections
            Object.values(elements.responseSections).forEach(section => {
                if (section) section.style.display = 'none';
            });
            
            // Clear input
            if (elements.feelingInput) {
                elements.feelingInput.value = '';
                elements.feelingInput.focus();
            }
            
            // Clear active chips
            document.querySelectorAll('.feeling-chip').forEach(chip => chip.classList.remove('active'));
        }
        
        function showLoadingSection() {
            if (elements.inputSection) elements.inputSection.style.display = 'none';
            if (elements.loadingSection) elements.loadingSection.style.display = 'block';
            
            // Hide all response sections
            Object.values(elements.responseSections).forEach(section => {
                if (section) section.style.display = 'none';
            });
            
            // Random loading text
            const loadingTexts = [
                "Crafting your personalized insight",
                "Applying emotional intelligence principles",
                "Generating gentle understanding",
                "Preparing your insight"
            ];
            const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
            const loadingText = document.getElementById('loadingText');
            if (loadingText) {
                loadingText.innerHTML = `${randomText}<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`;
            }
        }
        
        function openModal(modal) {
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
        
        function closeModal(modal) {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--gradient);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                font-weight: 500;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        function showApiStatus(message, type = 'success') {
            const statusElement = elements.apiStatus;
            if (!statusElement) return;
            
            statusElement.textContent = message;
            statusElement.className = `api-status ${type}`;
            statusElement.style.display = 'block';
            
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        }
        
        function showError(message) {
            const errorElement = elements.errorMessage;
            const errorText = elements.errorText;
            
            if (errorElement && errorText) {
                errorText.textContent = message;
                errorElement.style.display = 'flex';
                
                setTimeout(() => {
                    errorElement.style.display = 'none';
                }, 5000);
            }
        }

        // ==================== EVENT LISTENERS ====================
        function setupEventListeners() {
            // Submit button
            if (elements.submitBtn) {
                elements.submitBtn.addEventListener('click', handleSubmit);
            }
            
            // Enter key in input
            if (elements.feelingInput) {
                elements.feelingInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') handleSubmit();
                });
            }
            
            // New feeling buttons
            document.querySelectorAll('[id^="newFeelingBtn"]').forEach(btn => {
                btn.addEventListener('click', showInputSection);
            });
            
            // Length options
            if (elements.lengthOptions) {
                elements.lengthOptions.forEach(option => {
                    option.addEventListener('click', () => {
                        setResponseLength(option.dataset.length);
                    });
                });
            }
            
            // Theme toggle
            if (elements.themeToggle) {
                elements.themeToggle.addEventListener('click', () => {
                    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                    applyTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                });
            }
            
            // Modal buttons
            if (elements.infoBtn) {
                elements.infoBtn.addEventListener('click', () => openModal(elements.infoModal));
            }
            if (elements.closeInfo) {
                elements.closeInfo.addEventListener('click', () => closeModal(elements.infoModal));
            }
            if (elements.settingsBtn) {
                elements.settingsBtn.addEventListener('click', () => openModal(elements.settingsModal));
            }
            if (elements.closeSettings) {
                elements.closeSettings.addEventListener('click', () => closeModal(elements.settingsModal));
            }
            if (elements.saveSettingsBtn) {
                elements.saveSettingsBtn.addEventListener('click', savePreferences);
            }
            
            // Print buttons
            document.querySelectorAll('[id^="printBtn"]').forEach(btn => {
                btn.addEventListener('click', () => window.print());
            });
            
            // Save buttons
            document.querySelectorAll('[id^="saveBtn"]').forEach(btn => {
                btn.addEventListener('click', () => {
                    showNotification('Save feature coming soon!');
                });
            });
            
            // Modal close on outside click
            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    closeModal(e.target);
                }
            });
            
            // Escape key to close modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal(elements.infoModal);
                    closeModal(elements.settingsModal);
                }
            });
            
            // Social links
            document.querySelectorAll('.social-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    // Open in new tab for external links
                    if (link.href && !link.href.startsWith('mailto:')) {
                        e.preventDefault();
                        window.open(link.href, '_blank');
                    }
                });
            });
            
            // Trust badges
            document.querySelectorAll('.trust-badge').forEach(badge => {
                badge.addEventListener('click', () => {
                    showNotification('✓ Verified feature');
                });
            });
            
            // Retry button
            if (elements.retryBtn) {
                elements.retryBtn.addEventListener('click', () => {
                    if (elements.errorMessage) {
                        elements.errorMessage.style.display = 'none';
                    }
                    if (lastFeeling) {
                        handleSubmit();
                    }
                });
            }
            
            // New feeling buttons in response sections
            document.querySelectorAll('[id^="newFeelingBtn"]').forEach(btn => {
                btn.addEventListener('click', showInputSection);
            });
        }

        // ==================== FORM HANDLING ====================
        async function handleSubmit() {
            const feeling = elements.feelingInput?.value.trim() || '';
            
            // Validation
            if (!feeling) {
                showNotification("Please share how you're feeling");
                if (elements.feelingInput) elements.feelingInput.focus();
                return;
            }
            
            if (feeling.length > 200) {
                showNotification("Please keep your input under 200 characters for better insights");
                return;
            }
            
            // Show loading
            showLoadingSection();
            lastFeeling = feeling;
            
            try {
                // Get response
                const responseData = await analyzeFeeling(feeling, currentResponseLength);
                
                // Render response
                await renderResponse(feeling, responseData, currentResponseLength);
                
                // Show response section
                showResponseSection();
                
                console.log(`✅ Insight generated: "${feeling}" (${currentResponseLength}) from ${responseData.source}`);
                
                // Show source notification
                if (responseData.source === 'ai') {
                    showApiStatus('AI-generated insight', 'success');
                } else {
                    showApiStatus('Local insight (AI offline)', 'connecting');
                }
                
            } catch (error) {
                console.error('Error handling submit:', error);
                showError('Unable to generate insight. Please try again.');
                
                // Fallback to local response
                const localResponse = getLocalResponse(feeling, currentResponseLength);
                await renderResponse(feeling, localResponse, currentResponseLength);
                showResponseSection();
            }
        }

        // ==================== INITIALIZE APP ====================
        window.addEventListener('DOMContentLoaded', initApp);
        
        // Add CSS for slideIn animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
