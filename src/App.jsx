import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Leaderboard from './components/Leaderboard';
import TeamSnippetView from './components/TeamSnippetView';
import SnippetModal from './components/SnippetModal';
import ScheduleView from './components/ScheduleView';
import ScheduleModal from './components/ScheduleModal';
import TemplateEditor from './pages/TemplateEditor';
import AdminSettings from './pages/AdminSettings';
import AIChatbot from './components/AIChatbot';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'template', 'admin'
  
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: '김유신/컴퓨터학회(컴퓨터학회전공)',
    isLoggedIn: true,
    isAdmin: true // 관리자 권한
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null); // 'snippet', 'schedule', or 'tomorrow'
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [snippets, setSnippets] = useState({});
  const [schedules, setSchedules] = useState({});

  // INT-002: Tomorrow 계획 데이터
  const [tomorrowPlans, setTomorrowPlans] = useState({
    '2025-10-18': [
      { date: '2025-10-19', content: '프로젝트 최종 발표 준비', category: 'work' },
      { date: '2025-10-19', content: '코드 리뷰 진행', category: 'work' },
      { date: '2025-10-19', content: '문서화 작업 완료', category: 'study' }
    ],
    '2025-10-19': [
      { date: '2025-10-20', content: '새로운 기능 개발 시작', category: 'work' },
      { date: '2025-10-20', content: '테스트 코드 작성', category: 'work' }
    ]
  });

  // 팀 일정 데이터 (예시)
  const [teamSchedules, setTeamSchedules] = useState({
    '2025-10-15': [
      {
        userId: 1,
        userName: '김유서',
        userRole: '컴퓨터학회(컴퓨터학회전공)',
        schedules: [
          {
            id: 1,
            title: '프로젝트 회의',
            time: '14:00',
            description: '주간 프로젝트 진행상황 회의',
            category: 'meeting',
            priority: 'high',
            date: '2025-10-15'
          },
          {
            id: 2,
            title: '코드 리뷰',
            time: '16:30',
            description: '신규 기능 코드 리뷰',
            category: 'work',
            priority: 'medium',
            date: '2025-10-15'
          },
          {
            id: 3,
            title: '점심 약속',
            time: '12:00',
            description: '팀원들과 점심 식사',
            category: 'personal',
            priority: 'low',
            date: '2025-10-15'
          }
        ]
      },
      {
        userId: 2,
        userName: '김유신',
        userRole: '컴퓨터공학부(컴퓨터학회전공)',
        schedules: [
          {
            id: 4,
            title: '알고리즘 스터디',
            time: '10:00',
            description: '동적 계획법 문제 풀이',
            category: 'study',
            priority: 'high',
            date: '2025-10-15'
          },
          {
            id: 5,
            title: '프로젝트 회의',
            time: '14:00',
            description: '주간 프로젝트 진행상황 회의',
            category: 'meeting',
            priority: 'high',
            date: '2025-10-15'
          },
          {
            id: 6,
            title: '점심 약속',
            time: '12:00',
            description: '팀원들과 점심 식사',
            category: 'personal',
            priority: 'low',
            date: '2025-10-15'
          }
        ]
      },
      {
        userId: 3,
        userName: '이순신',
        userRole: '소프트웨어학과(빅데이터전공)',
        schedules: [
          {
            id: 7,
            title: '데이터 분석 미팅',
            time: '15:00',
            description: '사용자 행동 데이터 분석 결과 공유',
            category: 'work',
            priority: 'high',
            date: '2025-10-15'
          },
          {
            id: 8,
            title: '프로젝트 회의',
            time: '14:00',
            description: '주간 프로젝트 진행상황 회의',
            category: 'meeting',
            priority: 'high',
            date: '2025-10-15'
          }
        ]
      }
    ]
  });

  // 팀 스니펫 데이터 (예시)
  const [teamSnippets, setTeamSnippets] = useState({
    '2025-10-15': [
      {
        userId: 1,
        userName: '김유서',
        userRole: '컴퓨터학회(컴퓨터학회전공)',
        date: '2025년 10월 15일',
        title: '고객 VOC 분석 및 중간 발표 최종 준비',
        content: `What (무엇을 했나요?)
      오늘은 고객 VOC(Voice of Customer) 데이터를 기반으로 주요 불만 사항을 분석하고, 그 결과를 반영하여 중간 발표 자료를 최종 점검했습니다. 구체적으로는 고객 이탈 원인 상위 3가지를 도출하고, 각 원인에 대한 개선 가설을 수립했습니다. 발표 슬라이드(약 18페이지)를 재구성해 메시지 흐름을 정리하고, 데이터 시각화(그래프 3종)를 최신 수치로 갱신했으며, 내부 리허설을 통해 Q&A 대응 팩트를 정리했습니다.

      Why (왜 했나요?)
      고객 불만의 근본 원인을 명확히 하여 단기 개선 우선순위를 도출하고, 이해관계자(PO, CS, 영업)로부터 실행 동의를 얻기 위해서입니다. 명확한 데이터 근거와 일관된 메시지 전달은 의사결정 속도를 높이고 실행 리스크를 낮춥니다.

      Highlight (잘한 점)
      - 고객 VOC를 세그먼트별로 분류하여 상위 이슈를 구조화했고, 개선 우선순위(페어링 기준)를 제안했습니다.
      - 데이터 시각화를 통해 개선 기대 효과를 정량적으로 제시하여 이해관계자의 공감을 이끌었습니다.
      - 리허설을 통해 예상 질의에 대한 근거 자료(데이터 출처, 가정)를 정리해 발표 신뢰도를 높였습니다.

      Lowlight (아쉬운 점)
      - 일부 보조 지표(세그먼트별 전환율의 통계적 유의성) 확인이 부족해 추가 검증이 필요합니다.
      - 데모 환경에서 대용량 로그 처리 시 지연이 발생해 실제 데모 재현에 시간이 더 소요될 수 있습니다.

      Tomorrow (내일 할 일)
      - 발표 피드백을 반영해 슬라이드와 1-page 요약 자료를 보완하고, 관계자에게 사전 배포하겠습니다.
      - 통계적 유의성 검증을 위해 표본추출 기준을 재정의하고, 간단한 A/B 검증 스크립트를 실행해 초기 결과를 확보하겠습니다.`,
        tags: [],
        aiScore: {
          total: 82,
          breakdown: {
            what: 20,
            why: 25,
            highlight: 20,
            lowlight: 17,
            tomorrow: 20
          },
          comments: [
            'What: 행동 항목과 산출물이 구체적입니다.',
            'Why: 적용 목적과 기대 효과가 명확히 서술되어 설득력이 있습니다.',
            'Highlight: 데이터 근거를 통한 주장이 잘 정리되어 있습니다.',
            'Lowlight: 추가 검증 항목을 구체화하면 더욱 완성도가 높아집니다.',
            'Tomorrow: 실행 가능한 작업 항목이 구체적으로 제시되어 있습니다.'
          ],
          analyzedAt: '2025-10-15T10:30:00Z'
        },
        // stored total score (legacy/summary)
        score: 82,
        // user's health check (set to 6)
        healthScore: 6,
        likes: 0,
        likedBy: []
      },
            {
        userId: 2,
        userName: '김유신',
        userRole: '컴퓨터공학부(컴퓨터학회전공)',
        date: '2025년 10월 15일',
        title: '알고리즘 스터디: 동적 계획법 집중 학습',
        content: `What (무엇을 했나요?)
      오늘은 동적 계획법(DP) 심화 세션에 참여하여 대표적인 DP 유형(구간 분할, 최적화)을 중심으로 문제 4문제를 풀이했습니다. 각 문제에 대해 시간 복잡도 분석과 상태 정의를 명확히 하고, 재귀식에서 반복식으로의 전환 패턴을 문서화했습니다.

      Why (왜 했나요?)
      코딩 테스트와 시스템 최적화 이슈 해결 능력을 강화하기 위해 심화 학습을 진행했습니다. 특히 서비스 성능 관련 문제를 직면했을 때 알고리즘적 최적화를 적용할 수 있도록 실전형 문제 풀이 경험을 축적하는 것이 목적입니다.

      Highlight (잘한 점)
      - 팀원들과 역할을 분담해 문제 풀이 전략을 공유하고, 풀이 시간을 단축하는 템플릿을 만들었습니다.
      - 특정 문제의 DP 상태 전이식을 단순화하여 코드 재사용성을 높였습니다.

      Lowlight (아쉬운 점)
      - 일부 문제는 시간 부족으로 완전한 최적화가 이루어지지 못했습니다. 향후 리팩토링이 필요합니다.

      Tomorrow (내일 할 일)
      - 오늘 정리한 템플릿을 기반으로 연습 문제 10문제를 추가 풀이하고, 핵심 패턴을 팀 위키에 정리하겠습니다.
      - 서비스 관련 성능 이슈(특정 API의 응답 지연)를 DP 적용 가능성 측면에서 리뷰하겠습니다.`,
        tags: [],
        aiScore: {
          total: 60,
          breakdown: {
            what: 20,
            why: 20,
            highlight: 15,
            lowlight: 5,
            tomorrow: 0
          },
          comments: [
            'What: 활동이 구체적입니다.',
            'Why: 목적이 명확하지만 더 구체적인 연계 사례를 추가하면 좋습니다.',
            'Highlight: 협업 관점에서 성과가 확인됩니다.',
            'Lowlight: 개선 여지를 명시하면 계획 수립에 도움이 됩니다.',
            'Tomorrow: 내일 할 일 항목을 추가해 실행력을 높이세요.'
          ],
          analyzedAt: '2025-10-15T11:00:00Z'
        },
        // teammate health set to 5
        healthScore: 5,
        likes: 3,
        likedBy: [3, 4, 5]
      },
      {
        userId: 3,
        userName: '이철수',
        userRole: '컴퓨터공학부(소프트웨어전공)',
        date: '2025년 10월 15일',
        title: '프로젝트 핵심 기능 구현 및 인프라 점검',
        content: `What (무엇을 했나요?)
오늘은 실시간 채팅 기능의 핵심 로직을 구현하고, 데이터베이스 스키마를 확정했으며, API 엔드포인트 5개(메시지 전송/수신, 채널 목록, 유저 상태 등)를 개발했습니다. 또한 기본적인 부하 테스트를 수행하여 초당 요청 처리량을 측정했습니다.

Why (왜 했나요?)
실시간 커뮤니케이션은 사용자 참여를 높이는 핵심 기능으로, 안정적이고 지연이 낮은 처리 구조를 우선적으로 구현해야 했습니다. 스키마 확정은 추후 기능 확장과 데이터 분석을 용이하게 하기 위함입니다.

Highlight (잘한 점)
- 메시지 큐를 도입해 비동기 처리 경로를 분리하여 동시성 이슈를 완화했습니다.
- 기본 부하 테스트에서 기대 처리량의 85%를 확보했습니다.

Lowlight (아쉬운 점)
- 일부 API에서 대량 동시 연결 시 메모리 사용량이 급증하는 현상이 관찰되어 추가 최적화가 필요합니다.

Tomorrow (내일 할 일)
- 메모리 사용량 급증 원인을 분석하고, 캐시 정책 및 커넥션 풀 튜닝을 적용하겠습니다.
- 프론트엔드와 협업해 UI에서의 메시지 로드 최적화를 위한 페이징/가상화 설계를 논의하겠습니다.`,
        tags: [],
        aiScore: {
          total: 45,
          breakdown: {
            what: 20,
            why: 5,
            highlight: 10,
            lowlight: 5,
            tomorrow: 5
          },
          comments: [
            'What: 구현한 기능이 잘 정리되어 있습니다.',
            'Why: 목적을 간단히 서술하면 가독성이 좋아집니다.',
            'Highlight: 메시지 큐 도입 등 기술적 선택이 타당합니다.',
            'Lowlight: 메모리 사용량 이슈를 구체적으로 기록하세요.',
            'Tomorrow: 튜닝 계획이 구체적이라 실행 가능성이 높습니다.'
          ],
          analyzedAt: '2025-10-15T14:20:00Z'
        },
        // teammate health set to 6
        healthScore: 6,
        likes: 1,
        likedBy: [1]
      }
    ]
  });

  const handleLogin = () => {
    setCurrentUser({
      id: 1,
      name: '김유서/컴퓨터학회(컴퓨터학회전공)',
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setCurrentUser({
      id: null,
      name: null,
      isLoggedIn: false
    });
  };

  const handleDateClick = (date, mode) => {
    setSelectedDate(date);
    setSelectedMode(mode);
    setShowWriteModal(false);
    setShowScheduleModal(false);
  };

  const handleWriteSnippet = (date) => {
    setShowWriteModal(true);
  };

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setShowScheduleModal(true);
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = (date, scheduleData) => {
    const existingTeamSchedules = teamSchedules[date] || [];
    const userScheduleIndex = existingTeamSchedules.findIndex(s => s.userId === currentUser.id);

    if (editingSchedule) {
      // 수정 모드
      if (userScheduleIndex >= 0) {
        const updatedTeamSchedules = [...existingTeamSchedules];
        const scheduleIndex = updatedTeamSchedules[userScheduleIndex].schedules.findIndex(s => s.id === editingSchedule.id);
        
        if (scheduleIndex >= 0) {
          updatedTeamSchedules[userScheduleIndex].schedules[scheduleIndex] = scheduleData;
          setTeamSchedules({
            ...teamSchedules,
            [date]: updatedTeamSchedules
          });
        }
      }
    } else {
      // 추가 모드
      if (userScheduleIndex >= 0) {
        const updatedTeamSchedules = [...existingTeamSchedules];
        updatedTeamSchedules[userScheduleIndex] = {
          ...updatedTeamSchedules[userScheduleIndex],
          schedules: [...updatedTeamSchedules[userScheduleIndex].schedules, scheduleData]
        };
        setTeamSchedules({
          ...teamSchedules,
          [date]: updatedTeamSchedules
        });
      } else {
        const newUserSchedule = {
          userId: currentUser.id,
          userName: currentUser.name.split('/')[0],
          userRole: currentUser.name.split('/')[1] || '컴퓨터학회(컴퓨터학회전공)',
          schedules: [scheduleData]
        };
        setTeamSchedules({
          ...teamSchedules,
          [date]: [...existingTeamSchedules, newUserSchedule]
        });
      }
    }
    
    setEditingSchedule(null);
    setShowScheduleModal(false);
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (confirm('이 일정을 삭제하시겠습니까?')) {
      const existingTeamSchedules = teamSchedules[selectedDate] || [];
      const userScheduleIndex = existingTeamSchedules.findIndex(s => s.userId === currentUser.id);

      if (userScheduleIndex >= 0) {
        const updatedTeamSchedules = [...existingTeamSchedules];
        const updatedSchedules = updatedTeamSchedules[userScheduleIndex].schedules.filter(s => s.id !== scheduleId);
        
        updatedTeamSchedules[userScheduleIndex] = {
          ...updatedTeamSchedules[userScheduleIndex],
          schedules: updatedSchedules
        };

        setTeamSchedules({
          ...teamSchedules,
          [selectedDate]: updatedTeamSchedules
        });
      }
    }
  };

  const handleSaveSnippet = (date, snippetData) => {
    // 현재 사용자의 스니펫 저장
    const existingSnippets = teamSnippets[date] || [];
    const userSnippetIndex = existingSnippets.findIndex(s => s.userId === currentUser.id);
    const existingSnippet = userSnippetIndex >= 0 ? existingSnippets[userSnippetIndex] : null;

    const snippetTypeLabels = {
      daily: 'Daily Snippet',
      weekly: 'Weekly Snippet',
      monthly: 'Monthly Snippet',
      yearly: 'Yearly Snippet'
    };

    const newSnippet = {
      userId: currentUser.id,
      userName: currentUser.name.split('/')[0],
      userRole: currentUser.name.split('/')[1] || '',
      date: new Date(date).toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      snippetType: snippetData.snippetType || 'daily',
      title: snippetTypeLabels[snippetData.snippetType || 'daily'],
      content: snippetData.content,
      tags: [],
      // preserve legacy score if available, otherwise use aiScore.total when present
      score: snippetData.aiScore?.total ?? existingSnippet?.score ?? 0,
      aiScore: snippetData.aiScore || existingSnippet?.aiScore || null,
      healthScore: typeof snippetData.healthScore === 'object' ? (snippetData.healthScore?.total || 0) : (snippetData.healthScore ?? existingSnippet?.healthScore ?? 0),
      likes: existingSnippet?.likes || 0,
      likedBy: existingSnippet?.likedBy || []
    };

    if (userSnippetIndex >= 0) {
      // 기존 스니펫 업데이트
      existingSnippets[userSnippetIndex] = newSnippet;
    } else {
      // 새 스니펫 추가
      existingSnippets.push(newSnippet);
    }

    setTeamSnippets({
      ...teamSnippets,
      [date]: existingSnippets
    });

    // snippets state used by Calendar expects an array of snippets for the date
    setSnippets({
      ...snippets,
      [date]: existingSnippets
    });
  };

  const handleCloseTeamView = () => {
    setSelectedDate(null);
    setSelectedMode(null);
    setShowWriteModal(false);
  };

  const handleCloseScheduleView = () => {
    setSelectedDate(null);
    setSelectedMode(null);
    setShowScheduleModal(false);
  };

  const handleCloseWriteModal = () => {
    setShowWriteModal(false);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

  const getCurrentUserSnippet = (date) => {
    const dateSnippets = teamSnippets[date];
    if (!dateSnippets) return null;
    
    const userSnippet = dateSnippets.find(s => s.userId === currentUser.id);
    return userSnippet ? { 
      snippetType: userSnippet.snippetType || 'daily',
      content: userSnippet.content 
    } : null;
  };

  const getUserSchedules = (date) => {
    const schedulesForDate = teamSchedules[date] || [];
    const userSchedule = schedulesForDate.find(s => s.userId === currentUser.id);
    return userSchedule ? userSchedule.schedules : [];
  };

  const handleToggleLike = (date, snippetUserId) => {
    const dateSnippets = teamSnippets[date];
    if (!dateSnippets) return;

    const updatedSnippets = dateSnippets.map(snippet => {
      if (snippet.userId === snippetUserId) {
        const likedBy = snippet.likedBy || [];
        const hasLiked = likedBy.includes(currentUser.id);
        
        return {
          ...snippet,
          likes: hasLiked ? (snippet.likes || 1) - 1 : (snippet.likes || 0) + 1,
          likedBy: hasLiked 
            ? likedBy.filter(id => id !== currentUser.id)
            : [...likedBy, currentUser.id]
        };
      }
      return snippet;
    });

    setTeamSnippets({
      ...teamSnippets,
      [date]: updatedSnippets
    });
  };

  const handleTemplateClick = () => {
    setCurrentPage('template');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // 템플릿 편집 페이지 렌더링
  if (currentPage === 'template') {
    return (
      <TemplateEditor 
        user={currentUser}
        onBack={handleBackToHome}
      />
    );
  }

  // 메인 페이지 렌더링
  return (
    <div className="app">
      <Header 
        user={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onTemplateClick={handleTemplateClick}
        onAdminClick={() => setCurrentPage('admin')}
      />
      
      <div className="main-content">
        <div className="calendar-section">
          <Calendar 
            onDateClick={handleDateClick}
            snippets={teamSnippets}
            schedules={teamSchedules}
            tomorrowPlans={tomorrowPlans}
            currentUser={currentUser}
          />
        </div>
        
        <div className="leaderboard-section">
          <Leaderboard />
        </div>
      </div>

      {/* INT-003: AI 챗봇 플로팅 버튼 */}
      <button className="chatbot-fab" onClick={() => setShowChatbot(true)}>
        🤖 AI 스니펫 작성
      </button>

      {selectedDate && selectedMode === 'snippet' && !showWriteModal && (
        <TeamSnippetView
          date={selectedDate}
          teamSnippets={teamSnippets[selectedDate] || []}
          currentUser={currentUser}
          onClose={handleCloseTeamView}
          onWriteSnippet={handleWriteSnippet}
          onToggleLike={handleToggleLike}
        />
      )}

      {selectedDate && selectedMode === 'schedule' && !showScheduleModal && (
        <ScheduleView
          selectedDate={selectedDate}
          schedules={getUserSchedules(selectedDate)}
          teamSchedules={teamSchedules[selectedDate] || []}
          tomorrowPlans={tomorrowPlans[selectedDate] || []}
          onClose={handleCloseScheduleView}
          onDelete={handleDeleteSchedule}
          onEdit={handleEditSchedule}
          onAdd={handleAddSchedule}
        />
      )}

      {showWriteModal && selectedDate && (
        <SnippetModal
          date={selectedDate}
          snippet={getCurrentUserSnippet(selectedDate)}
          onSave={handleSaveSnippet}
          onClose={handleCloseWriteModal}
          timeAttackMode={false}
        />
      )}

      {showScheduleModal && selectedDate && (
        <ScheduleModal
          date={selectedDate}
          schedule={editingSchedule}
          onSave={handleSaveSchedule}
          onClose={handleCloseScheduleModal}
        />
      )}

      {/* INT-003: AI 챗봇 */}
      {showChatbot && (
        <AIChatbot
          onClose={() => setShowChatbot(false)}
          onSnippetGenerated={(content) => {
            const today = new Date().toISOString().split('T')[0];
            handleSaveSnippet(today, { snippetType: 'daily', content });
            setShowChatbot(false);
          }}
        />
      )}

      {/* 관리자 설정 페이지 - 전체화면 오버레이 */}
      {currentPage === 'admin' && currentUser.isAdmin && (
        <div className="admin-page-overlay">
          <AdminSettings onClose={() => setCurrentPage('home')} />
        </div>
      )}

      {/* 템플릿 에디터 */}
      {currentPage === 'template' && (
        <TemplateEditor onClose={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;
