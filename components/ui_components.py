"""
UI Components Module for Chief of Staff Demo

This module contains reusable UI components with dynamic elements and modern styling
for the dark theme Streamlit application. Includes floating background elements,
custom styled components, and interactive elements designed for executive use.
"""

import streamlit as st
import random
import time
from typing import List, Dict, Any
import json

# CSS for dynamic background elements and modern styling
BACKGROUND_CSS = """
<style>
/* Dark theme styling with improved gradients */
.stApp {
    background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e4b99 100%);
    color: #ffffff;
}

/* Floating background elements */
.floating-element {
    position: fixed;
    opacity: 0.08;
    pointer-events: none;
    z-index: -1;
    animation: float 8s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    25% { transform: translateY(-15px) rotate(90deg) scale(1.1); }
    50% { transform: translateY(-30px) rotate(180deg) scale(0.9); }
    75% { transform: translateY(-15px) rotate(270deg) scale(1.1); }
}

/* Omni bar styling with dynamic background */
.omni-bar {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%);
    backdrop-filter: blur(15px);
    border: 2px solid transparent;
    border-radius: 30px;
    padding: 18px 25px;
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
}

.omni-bar::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
    background-size: 400% 400%;
    border-radius: 32px;
    z-index: -1;
    animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.omni-bar:focus-within {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 50%, rgba(255, 255, 255, 0.15) 100%);
    box-shadow: 0 16px 50px rgba(102, 126, 234, 0.4);
    transform: translateY(-2px);
}

/* Card styling with improved gradients */
.modern-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(102, 126, 234, 0.05) 100%);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 25px;
    margin: 15px 0;
    transition: all 0.4s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.modern-card:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(102, 126, 234, 0.08) 100%);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-4px);
    box-shadow: 0 16px 50px rgba(102, 126, 234, 0.2);
}

/* Button styling with improved gradients */
.custom-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border: none;
    border-radius: 25px;
    padding: 14px 28px;
    color: white;
    font-weight: 600;
    transition: all 0.4s ease;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.custom-button:hover {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
}

/* Icon styling with logos */
.icon-container {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(102, 126, 234, 0.08) 100%);
    border-radius: 25px;
    margin: 8px;
    transition: all 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.icon-container:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(102, 126, 234, 0.12) 100%);
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Metric styling with enhanced gradients */
.metric-card {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 50%, rgba(240, 147, 251, 0.1) 100%);
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 18px;
    padding: 20px;
    text-align: center;
    margin: 12px 0;
    transition: all 0.4s ease;
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.2);
}

.metric-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
}

.metric-value {
    font-size: 2.2em;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.metric-label {
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 8px;
}

/* Progress bar styling with gradients */
.custom-progress {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    height: 10px;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-progress-bar {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    height: 100%;
    border-radius: 15px;
    transition: width 0.6s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

/* Question hotkeys styling */
.question-hotkey {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 20px;
    padding: 10px 16px;
    margin: 6px 3px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9em;
    display: inline-block;
}

.question-hotkey:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
    border-color: rgba(102, 126, 234, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Hide Streamlit default elements */
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}
</style>
"""

def inject_custom_css():
    """
    Injects custom CSS for dark theme and dynamic elements.
    Should be called at the beginning of the app.
    """
    st.markdown(BACKGROUND_CSS, unsafe_allow_html=True)

def create_floating_background():
    """
    Creates dynamic floating background elements for visual appeal.
    Returns HTML string with animated elements.
    """
    elements = [
        "💼", "📊", "💡", "🎯", "📈", "⚡", "🚀", "💎", "🔬", "🌟"
    ]
    
    html_elements = []
    for i in range(20):
        element = random.choice(elements)
        x = random.randint(5, 95)
        y = random.randint(5, 95)
        delay = random.uniform(0, 8)
        duration = random.uniform(6, 12)
        
        html_elements.append(f"""
        <div class="floating-element" style="
            left: {x}%; 
            top: {y}%; 
            font-size: {random.randint(24, 48)}px;
            animation-delay: {delay}s;
            animation-duration: {duration}s;
        ">{element}</div>
        """)
    
    return f"""
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
        {''.join(html_elements)}
    </div>
    """

def create_omni_bar(placeholder_text: str = "Ask anything about your organization...") -> str:
    """
    Creates a modern omni-bar styled input field with dynamic background.
    
    Args:
        placeholder_text (str): Placeholder text for the input field
        
    Returns:
        str: User input from the omni-bar
    """
    st.markdown("""
    <div style="margin: 30px 0;">
        <div class="omni-bar">
            <input type="text" placeholder="{}" style="
                background: transparent;
                border: none;
                color: white;
                font-size: 18px;
                width: 100%;
                outline: none;
                font-weight: 500;
            "/>
        </div>
    </div>
    """.format(placeholder_text), unsafe_allow_html=True)
    
    return st.text_input("Executive Query", placeholder=placeholder_text, key="omni_bar_input", label_visibility="collapsed")

def create_question_hotkeys(on_click_callback):
    """
    Creates clickable question hotkeys for common executive queries.
    
    Args:
        on_click_callback: Callback function when a question is clicked
    """
    questions = [
        "What are our biggest risks right now?",
        "How is our financial performance trending?",
        "What operational inefficiencies should I address?",
        "Where should we focus our strategic investments?",
        "What competitive threats are emerging?",
        "How can we improve customer satisfaction?",
        "What compliance issues need attention?",
        "Where are our best growth opportunities?"
    ]
    
    st.markdown("""
    <div style="margin: 20px 0;">
        <h4 style="color: rgba(255,255,255,0.8); margin-bottom: 15px; font-size: 1.1em;">
            💡 Try asking your Chief of Staff:
        </h4>
    </div>
    """, unsafe_allow_html=True)
    
    # Create columns for the questions
    cols = st.columns(2)
    for i, question in enumerate(questions):
        with cols[i % 2]:
            if st.button(question, key=f"hotkey_{i}", help="Click to use this question"):
                return question
    
    return None

def create_import_buttons():
    """
    Creates styled import buttons with proper logos for different document sources.
    """
    st.markdown("""
    <div style="margin: 25px 0;">
        <h3 style="color: rgba(255,255,255,0.9); margin-bottom: 20px; text-align: center;">
            Import Documents
        </h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col1:
        st.markdown("""
        <div class="icon-container">
            <span style="font-size: 24px;">📁</span>
            <span style="font-weight: 500;">Sample Documents</span>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Load Sample Documents", key="add_samples"):
            return "samples"
    
    with col2:
        st.markdown("""
        <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" style="margin-right: 4px;">
                <path fill="#4A154B" d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.61 0 2.929-1.66 2.929-3.25v-.15c0 .47.242.85.566 1.075.242.137.517.162.795.08.48-.15.83-.67.83-1.24 0-1.66.67-2.5 1.32-2.5.65 0 1.33.84 1.33 2.5 0 .57.35 1.09.83 1.24.278.082.553.057.795-.08.324-.225.566-.605.566-1.075v.15c0 1.59 1.319 3.25 2.929 3.25a2.528 2.528 0 0 0 2.5-2.5c0-.41-.04-.83-.1-1.25-.897.72-2.122 1.2-3.535 1.2-1.556 0-2.897-.69-3.682-1.78-.785 1.09-2.126 1.78-3.682 1.78-1.413 0-2.638-.48-3.535-1.2-.06.42-.1.84-.1 1.25z"/>
                <path fill="#4A154B" d="M5.042 15.165c-.06-.42-.1-.84-.1-1.25 0-1.66.67-2.5 1.32-2.5s1.33.84 1.33 2.5c0 .57.35 1.09.83 1.24.278.082.553.057.795-.08.324-.225.566-.605.566-1.075v.15c0 1.59 1.319 3.25 2.929 3.25a2.528 2.528 0 0 0 2.5-2.5z"/>
            </svg>
            <span style="font-weight: 500;">Slack</span>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Connect Slack", key="slack_import"):
            return "slack"
    
    with col3:
        st.markdown("""
        <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" style="margin-right: 4px;">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style="font-weight: 500;">Google Drive</span>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Connect Google Drive", key="gdrive_import"):
            return "gdrive"
    
    return None

def create_metric_card(value: str, label: str, color: str = "#667eea"):
    """
    Creates a styled metric card with value and label.
    
    Args:
        value (str): The metric value to display
        label (str): The label for the metric
        color (str): Color for the value (hex code)
    """
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-value">{value}</div>
        <div class="metric-label">{label}</div>
    </div>
    """, unsafe_allow_html=True)

def create_progress_bar(progress: float, label: str = ""):
    """
    Creates a custom styled progress bar.
    
    Args:
        progress (float): Progress value between 0 and 1
        label (str): Optional label for the progress bar
    """
    st.markdown(f"""
    <div style="margin: 15px 0;">
        {f'<div style="margin-bottom: 8px; color: rgba(255,255,255,0.8); font-weight: 500;">{label}</div>' if label else ''}
        <div class="custom-progress">
            <div class="custom-progress-bar" style="width: {progress * 100}%;"></div>
        </div>
    </div>
    """, unsafe_allow_html=True)

def create_comparison_card(title: str, content: str, is_zeroentropy: bool = True):
    """
    Creates a comparison card for AI Chief of Staff vs Traditional approaches.
    
    Args:
        title (str): Card title
        content (str): Card content
        is_zeroentropy (bool): Whether this is an AI Chief of Staff card (affects styling)
    """
    if is_zeroentropy:
        color = "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
        bg_color = "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)"
        border_color = "rgba(102, 126, 234, 0.4)"
    else:
        color = "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff9ff3 100%)"
        bg_color = "linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(238, 90, 36, 0.15) 100%)"
        border_color = "rgba(255, 107, 107, 0.4)"
    
    st.markdown(f"""
    <div class="modern-card" style="
        background: {bg_color};
        border-color: {border_color};
    ">
        <h3 style="
            background: {color};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
            font-weight: 600;
        ">{title}</h3>
        <p style="line-height: 1.7; color: rgba(255,255,255,0.9); font-size: 1.05em;">{content}</p>
    </div>
    """, unsafe_allow_html=True)

def create_header(title: str, subtitle: str = ""):
    """
    Creates a modern header with title and subtitle.
    
    Args:
        title (str): Main title
        subtitle (str): Optional subtitle
    """
    st.markdown(f"""
    <div style="text-align: center; margin: 50px 0;">
        <h1 style="
            font-size: 3.5em; 
            font-weight: 700; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #f5576c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        ">{title}</h1>
        {f'<p style="font-size: 1.3em; color: rgba(255,255,255,0.8); margin-top: 0; font-weight: 400;">{subtitle}</p>' if subtitle else ''}
    </div>
    """, unsafe_allow_html=True) 