const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, '../client/src/pages/student/Dashboard.jsx');
let content = fs.readFileSync(dashPath, 'utf8');

// Add Bestu Popup UI if not present
if (!content.includes('BestuPrompt')) {
  content = content.replace(
    /return \(\n\s+<div className="w-full pb-12 pt-4 bg-slate-50 min-h-screen">/,
    `const BestuPrompt = () => (
      <div className="fixed bottom-6 right-6 max-w-sm bg-white border border-indigo-200 shadow-2xl rounded-2xl p-5 z-50 animate-bounce">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
            <span className="text-2xl">🤖</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-800">Bestu says:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hey! You've been consistently practicing. It's time to take a Periodic Reassessment to see your level up across all 6 subjects!
            </p>
            <Link to="/reassessment" className="inline-block mt-2 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
              Take Reassessment Now
            </Link>
          </div>
        </div>
      </div>
    );

    return (
      <div className="w-full pb-12 pt-4 bg-slate-50 min-h-screen">
        {dashboardData?.streak >= 3 && <BestuPrompt />}
`
  );
  fs.writeFileSync(dashPath, content);
  console.log('Added Bestu prompt to Dashboard');
}
