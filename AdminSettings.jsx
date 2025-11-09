import React, { useState } from 'react';
import './AdminSettings.css';

function AdminSettings({ onClose }) {
  const [activeTab, setActiveTab] = useState('scoring');

  const [scoringCriteria, setScoringCriteria] = useState({
    what: { weight: 20, description: 'What did you learn today' },
    why: { weight: 25, description: 'Why is it important' },
    highlight: { weight: 20, description: 'What went well' },
    lowlight: { weight: 15, description: 'What needs improvement' },
    tomorrow: { weight: 20, description: 'Plan for tomorrow' }
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Team Member 1', role: 'Frontend Developer', email: 'member1@company.com' },
    { id: 2, name: 'Team Member 2', role: 'UI/UX Designer', email: 'member2@company.com' },
    { id: 3, name: 'Team Member 3', role: 'Backend Developer', email: 'member3@company.com' }
  ]);

  const [teamInfo, setTeamInfo] = useState({
    teamName: 'Daily Snippet Team',
    department: 'Development'
  });

  const [apiKeys, setApiKeys] = useState({
    gemini: '',
    openai: ''
  });

  const [showApiKeys, setShowApiKeys] = useState({
    gemini: false,
    openai: false
  });

  const [performanceData, setPerformanceData] = useState({
    weekly: {
      avgScore: 78,
      completionRate: 85,
      growthRate: 12
    },
    monthly: {
      avgScore: 75,
      completionRate: 82,
      growthRate: 8
    }
  });

  const fieldDefinitions = [
    { id: 1, name: 'What', maxScore: 20, required: true, placeholder: 'What did you learn' },
    { id: 2, name: 'Why', maxScore: 25, required: true, placeholder: 'Why is it important' },
    { id: 3, name: 'Highlight', maxScore: 20, required: true, placeholder: 'What went well' },
    { id: 4, name: 'Lowlight', maxScore: 15, required: true, placeholder: 'What needs improvement' },
    { id: 5, name: 'Tomorrow', maxScore: 20, required: true, placeholder: 'Plan for tomorrow' }
  ];

  const orgRankings = {
    rankings: [
      { rank: 1, name: 'Hanwha Q CELLS', avgScore: 92, memberCount: 58, completionRate: 96 },
      { rank: 2, name: 'Hanwha Vision', avgScore: 90, memberCount: 45, completionRate: 95 },
      { rank: 3, name: 'Hanwha Power Systems', avgScore: 89, memberCount: 62, completionRate: 94 },
      { rank: 4, name: 'Hanwha Aerospace', avgScore: 88, memberCount: 78, completionRate: 93 },
      { rank: 5, name: 'Vision Nexus', avgScore: 87, memberCount: 42, completionRate: 92 },
      { rank: 6, name: 'Samsung Electronics', avgScore: 86, memberCount: 180, completionRate: 91 },
      { rank: 7, name: 'LG Electronics', avgScore: 85, memberCount: 165, completionRate: 88 },
      { rank: 8, name: 'SK Innovation', avgScore: 82, memberCount: 140, completionRate: 86 },
      { rank: 9, name: 'Hyundai Motors', avgScore: 80, memberCount: 220, completionRate: 85 },
      { rank: 10, name: 'Naver', avgScore: 79, memberCount: 142, completionRate: 84 }
    ]
  };

  const handleAddMember = () => {
    const newMember = {
      id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
      name: `Team Member ``,
      role: '',
      email: ''
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const handleUpdateMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSaveApiKey = (service) => {
    console.log(`Saved `` API key`);
  };

  return (
    <div className="admin-settings">
      <div className="admin-header">
        <h1>Admin Settings</h1>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn `}
          onClick={() => setActiveTab('scoring')}
        >
          Scoring Criteria
        </button>
        <button
          className={`tab-btn `}
          onClick={() => setActiveTab('team')}
        >
          Team Management
        </button>
        <button
          className={`tab-btn `}
          onClick={() => setActiveTab('api')}
        >
          API Settings
        </button>
        <button
          className={`tab-btn `}
          onClick={() => setActiveTab('ranking')}
        >
          Organization Ranking
        </button>
        <button
          className={`tab-btn `}
          onClick={() => setActiveTab('performance')}
        >
          Performance Analysis
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'scoring' && (
          <div className="scoring-settings">
            <h2>Scoring Criteria Settings</h2>
            <p className="description">Configure daily snippet scoring criteria.</p>

            <div className="scoring-criteria-section">
              {fieldDefinitions.map(field => (
                <div key={field.id} className="criteria-item">
                  <label>{field.name}</label>
                  <div className="criteria-controls">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scoringCriteria[field.name.toLowerCase()]?.weight || 0}
                      placeholder="Score"
                      className="score-input"
                      readOnly
                    />
                    <span className="max-score">/ {field.maxScore}</span>
                  </div>
                  <textarea
                    value={scoringCriteria[field.name.toLowerCase()]?.description || ''}
                    placeholder={field.placeholder}
                    className="criteria-textarea"
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="team-settings">
            <h2>Team Management</h2>

            <div className="team-info-section">
              <div className="form-group">
                <label>Team Name</label>
                <input
                  type="text"
                  value={teamInfo.teamName}
                  onChange={(e) => setTeamInfo({ ...teamInfo, teamName: e.target.value })}
                  className="text-input"
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={teamInfo.department}
                  onChange={(e) => setTeamInfo({ ...teamInfo, department: e.target.value })}
                  className="text-input"
                />
              </div>
            </div>

            <div className="team-members-section">
              <div className="section-header">
                <h3>Team Members</h3>
                <button className="add-btn" onClick={handleAddMember}>
                  Add Member
                </button>
              </div>

              {teamMembers.map(member => (
                <div key={member.id} className="member-item">
                  <div className="member-inputs">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleUpdateMember(member.id, 'name', e.target.value)}
                      placeholder="Name"
                      className="member-input"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleUpdateMember(member.id, 'role', e.target.value)}
                      placeholder="Role"
                      className="member-input"
                    />
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => handleUpdateMember(member.id, 'email', e.target.value)}
                      placeholder="Email"
                      className="email-input"
                    />
                    <button
                      className="delete-btn"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="api-settings">
            <h2>API Settings</h2>
            <p className="description">Register API keys for AI scoring.</p>

            <div className="api-key-section">
              <div className="api-key-item">
                <label>Google Gemini API</label>
                <div className="api-input-group">
                  <input
                    type={showApiKeys.gemini ? 'text' : 'password'}
                    value={apiKeys.gemini}
                    onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                    placeholder="Enter API Key"
                    className="api-key-input"
                  />
                  <button
                    className="toggle-btn"
                    onClick={() => setShowApiKeys({ ...showApiKeys, gemini: !showApiKeys.gemini })}
                  >
                    {showApiKeys.gemini ? 'Hide' : 'Show'}
                  </button>
                  <button className="save-btn" onClick={() => handleSaveApiKey('gemini')}>
                    Save
                  </button>
                </div>
              </div>

              <div className="api-key-item">
                <label>OpenAI API</label>
                <div className="api-input-group">
                  <input
                    type={showApiKeys.openai ? 'text' : 'password'}
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                    placeholder="Enter API Key"
                    className="api-key-input"
                  />
                  <button
                    className="toggle-btn"
                    onClick={() => setShowApiKeys({ ...showApiKeys, openai: !showApiKeys.openai })}
                  >
                    {showApiKeys.openai ? 'Hide' : 'Show'}
                  </button>
                  <button className="save-btn" onClick={() => handleSaveApiKey('openai')}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ranking' && (
          <div className="ranking-settings">
            <h2>Organization Ranking</h2>
            <p className="description">Rankings of Hanwha affiliates and major companies.</p>

            <div className="ranking-list">
              {orgRankings.rankings.map(org => (
                <div key={org.rank} className="ranking-item">
                  <div className="rank-badge">{org.rank}</div>
                  <div className="rank-info">
                    <h4>{org.name}</h4>
                    <div className="rank-stats">
                      <span>Avg Score: {org.avgScore}</span>
                      <span>Members: {org.memberCount}</span>
                      <span>Completion: {org.completionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="performance-settings">
            <h2>Performance Analysis</h2>

            <div className="performance-cards">
              <div className="performance-card">
                <h3>Weekly Performance</h3>
                <div className="stat">
                  <span className="label">Average Score</span>
                  <span className="value">{performanceData.weekly.avgScore}</span>
                </div>
                <div className="stat">
                  <span className="label">Completion Rate</span>
                  <span className="value">{performanceData.weekly.completionRate}%</span>
                </div>
                <div className="stat">
                  <span className="label">Growth Rate</span>
                  <span className="value">{performanceData.weekly.growthRate}%</span>
                </div>
              </div>

              <div className="performance-card">
                <h3>Monthly Performance</h3>
                <div className="stat">
                  <span className="label">Average Score</span>
                  <span className="value">{performanceData.monthly.avgScore}</span>
                </div>
                <div className="stat">
                  <span className="label">Completion Rate</span>
                  <span className="value">{performanceData.monthly.completionRate}%</span>
                </div>
                <div className="stat">
                  <span className="label">Growth Rate</span>
                  <span className="value">{performanceData.monthly.growthRate}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSettings;