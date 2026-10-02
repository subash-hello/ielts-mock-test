import { runAgent1ConsultancyAdmin, QAReportEntry } from './agent1_consultancy_admin';
import { runAgent2MultiPcTerminal } from './agent2_multi_pc_terminal';
import { runAgent3EvalAndResults } from './agent3_eval_and_results';
import { runAgent4UiUxAudit } from './agent4_ui_ux_audit';

async function main() {
  console.log('=====================================================');
  console.log('  RUNNING COMPREHENSIVE BROWSER QA AGENT SUITE');
  console.log('  Simulating Real Human Testers across Multiple Roles');
  console.log('=====================================================\n');

  const baseUrl = process.env.BASE_URL || 'http://localhost:4173';
  const allResults: QAReportEntry[] = [];

  console.log('[1/4] Launching AdminQAAgent (Super Admin, Consultancy Setup, Test Launch/Stop)...');
  const adminResults = await runAgent1ConsultancyAdmin(baseUrl);
  allResults.push(...adminResults);
  console.log(`      Completed with ${adminResults.filter(r => r.status === 'PASS').length} passes, ${adminResults.filter(r => r.status === 'FAIL').length} failures.\n`);

  console.log('[2/4] Launching TerminalQAAgent (PC-01, PC-02 Multi-Kiosk Real-Time Simulation)...');
  const terminalResults = await runAgent2MultiPcTerminal(baseUrl);
  allResults.push(...terminalResults);
  console.log(`      Completed with ${terminalResults.filter(r => r.status === 'PASS').length} passes, ${terminalResults.filter(r => r.status === 'FAIL').length} failures.\n`);

  console.log('[3/4] Launching ResultsQAAgent (Examiner Grading, Score Publishing & Candidate TRF)...');
  const resultsResults = await runAgent3EvalAndResults(baseUrl);
  allResults.push(...resultsResults);
  console.log(`      Completed with ${resultsResults.filter(r => r.status === 'PASS').length} passes, ${resultsResults.filter(r => r.status === 'FAIL').length} failures.\n`);

  console.log('[4/4] Launching UiUxQAAgent (1920x1080, 1366x768, 768x1024, 375x812 Viewports)...');
  const uiUxResults = await runAgent4UiUxAudit(baseUrl);
  allResults.push(...uiUxResults);
  console.log(`      Completed with ${uiUxResults.filter(r => r.status === 'PASS').length} passes, ${uiUxResults.filter(r => r.status === 'FAIL').length} failures.\n`);

  // Detailed Summary
  console.log('=====================================================');
  console.log('                QA AGENT TEST REPORT');
  console.log('=====================================================\n');

  const passed = allResults.filter(r => r.status === 'PASS');
  const warnings = allResults.filter(r => r.status === 'WARN');
  const failed = allResults.filter(r => r.status === 'FAIL');

  console.log(`Total Scenarios Tested : ${allResults.length}`);
  console.log(`Passed Checks          : ${passed.length} [${Math.round((passed.length / allResults.length) * 100)}%]`);
  console.log(`Warnings / Notes       : ${warnings.length}`);
  console.log(`Failed / Bugs          : ${failed.length}\n`);

  console.log('--- DETAILED STEP BREAKDOWN ---');
  allResults.forEach((r, idx) => {
    const symbol = r.status === 'PASS' ? '✓ [PASS]' : r.status === 'WARN' ? '⚠️ [WARN]' : '✕ [FAIL]';
    console.log(`${idx + 1}. ${symbol} [${r.agent}] ${r.step}`);
    console.log(`   Details: ${r.details}`);
    if (r.uiUxNote) console.log(`   UI/UX Note: ${r.uiUxNote}`);
    if (r.bug) console.log(`   BUG REPORTED: ${r.bug}`);
  });

  console.log('\n=====================================================');
  if (failed.length === 0) {
    console.log('  ALL BROWSER-LEVEL QA AGENT TESTS COMPLETED SUCCESSFULLY!');
  } else {
    console.log(`  ATTENTION: ${failed.length} DEFECTS DETECTED REQUIRING ATTENTION.`);
  }
  console.log('=====================================================\n');
}

main().catch(err => {
  console.error('Fatal error in QA runner:', err);
  process.exit(1);
});
