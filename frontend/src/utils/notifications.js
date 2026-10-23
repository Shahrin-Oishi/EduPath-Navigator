export function buildNotifications(user, progressMap, careers) {
  if (!user) return []
  const notifications = [{
    id: `welcome-${user._id}`, kind: 'welcome', title: 'Welcome to EduPath Navigator',
    message: 'Choose a career path to start learning.', date: user.createdAt,
    to: '/career-paths',
  }]
  for (const progress of Object.values(progressMap)) {
    const career = careers.find(item => item.id === progress.roadmapId)
    if (!career) continue
    const completed = progress.completedSkills?.length || 0
    const total = progress.totalSkills || career.totalSkills
    const remaining = Math.max(0, total - completed)
    notifications.push({
      id: `${career.id}-${progress.updatedAt || completed}`,
      kind: remaining === 0 ? 'complete' : 'progress',
      title: remaining === 0 ? `${career.title} completed!` : `Continue ${career.title}`,
      message: `${completed} of ${total} skills completed. ${remaining} remaining.`,
      date: progress.updatedAt, to: `/roadmap/${career.id}`,
    })
  }
  return notifications.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}
