# -*- coding: utf-8 -*-
"""
Generator for client/src/data/os/osSummaryNotesData.js
Creates concise summary revision notes for all 30 OS topics.
Structure per topic:
- topicId
- topicName
- domainName
- definition
- keyPoints: [...]
- formulas: [...]
- algorithmSteps: [...]
- differences: { title, col1, col2, rows: [[item1, item2], ...] }
- commonTraps: [...]
- flowchart: [...]
"""

import json
import os

target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'client', 'src', 'data', 'os', 'osSummaryNotesData.js'))

from os_cards_data_part1 import PART1_CARDS
from os_cards_data_part2 import PART2_CARDS
from os_cards_data_part3 import PART3_CARDS

# Load canonical card sources to build consistent summary notes
with open(os.path.join(os.path.dirname(__file__), 'existing_10_topics.json'), 'r', encoding='utf-8') as f:
    existing_10 = json.load(f)

ALL_TOPIC_CARDS = {}
ALL_TOPIC_CARDS.update(PART1_CARDS)
ALL_TOPIC_CARDS['processes-process-states'] = existing_10['processes']
ALL_TOPIC_CARDS['pcb-context-switching'] = PART2_CARDS['pcb-context-switching']
ALL_TOPIC_CARDS['threads-multithreading'] = existing_10['threads']
ALL_TOPIC_CARDS['ipc'] = PART2_CARDS['ipc']
ALL_TOPIC_CARDS['cpu-scheduling-fundamentals'] = existing_10['cpu-scheduling']
ALL_TOPIC_CARDS['fcfs-scheduling'] = existing_10['fcfs']
ALL_TOPIC_CARDS['sjf-srtf-scheduling'] = existing_10['sjf-srtf']
ALL_TOPIC_CARDS['priority-scheduling-algo'] = existing_10['priority-scheduling']
ALL_TOPIC_CARDS['round-robin-scheduling'] = existing_10['round-robin']
ALL_TOPIC_CARDS['mlq-mlfq-scheduling'] = PART2_CARDS['mlq-mlfq-scheduling']
ALL_TOPIC_CARDS.update(PART3_CARDS)
ALL_TOPIC_CARDS['deadlock-fundamentals'] = existing_10['deadlocks']
ALL_TOPIC_CARDS['main-memory-allocation'] = existing_10['memory-management']
ALL_TOPIC_CARDS['file-systems-allocation'] = existing_10['file-systems']

SUMMARY_DATA = {}

for tid, cards in ALL_TOPIC_CARDS.items():
    c1 = cards[0]
    c3 = cards[2]
    c6 = cards[5]
    c8 = cards[7]
    c10 = cards[9]
    
    # Extract concise summary points
    definition = c1.get('definition', '')
    summary_pts = c10.get('cheatSheet', {}).get('summaryPoints', [c1.get('simpleWords', '')])
    key_rule = c10.get('cheatSheet', {}).get('keyRule', '')
    
    # Extract formulas or key rules
    formulas = []
    if c6.get('formula'):
        formulas.append(c6['formula'])
    elif key_rule:
        formulas.append(key_rule)

    # Extract steps
    steps = []
    if c3.get('steps'):
        for s in c3['steps'][:4]:
            steps.append(f"{s.get('title', '')}: {s.get('desc', '')}")
    elif c3.get('stateTransitions'):
        steps = c3['stateTransitions'][:4]

    # Extract traps
    traps = []
    for tr in c8.get('traps', [])[:3]:
        mistake = tr.get('mistake') or tr.get('wrong', '')
        correct = tr.get('correct', '')
        traps.append(f"❌ {mistake} -> ✅ {correct}")

    SUMMARY_DATA[tid] = {
        "topicId": tid,
        "title": c1.get('title', '').replace('What is ', '').replace('What are ', '').replace('?', ''),
        "definition": definition,
        "keyRule": key_rule,
        "keyPoints": summary_pts,
        "formulas": formulas,
        "algorithmSteps": steps,
        "commonTraps": traps
    }

print(f"Generated summary data for {len(SUMMARY_DATA)} topics.")

js_content = f"""/**
 * MASTER OPERATING SYSTEMS (OS) SECTION 5: SUMMARY & NOTES DATA
 * 
 * Provides concise revision notes for ALL 30 canonical OS syllabus topics:
 * - Definition
 * - Key Rule
 * - High-Yield Summary Points
 * - Essential Formulas / Invariants
 * - Core Algorithm Steps
 * - Common Traps & Edge Cases
 */

export const OS_SUMMARY_NOTES_DATA = {json.dumps(SUMMARY_DATA, indent=2)};

/**
 * Accessor returning concise summary notes for any topic ID or alias
 */
export function getOSTopicSummary(topicId) {{
  if (!topicId) return OS_SUMMARY_NOTES_DATA['intro-to-os'];
  const clean = String(topicId).toLowerCase().trim().replace(/_/g, '-');

  if (OS_SUMMARY_NOTES_DATA[clean]) {{
    return OS_SUMMARY_NOTES_DATA[clean];
  }}

  // Alias fallback
  const aliasMap = {{
    'processes': 'processes-process-states',
    'threads': 'threads-multithreading',
    'cpu-scheduling': 'cpu-scheduling-fundamentals',
    'fcfs': 'fcfs-scheduling',
    'sjf-srtf': 'sjf-srtf-scheduling',
    'priority-scheduling': 'priority-scheduling-algo',
    'round-robin': 'round-robin-scheduling',
    'deadlocks': 'deadlock-fundamentals',
    'bankers-algorithm': 'bankers-algorithm-safe-state',
    'memory-management': 'main-memory-allocation',
    'paging': 'paging-page-tables',
    'file-systems': 'file-systems-allocation',
    'disk-scheduling': 'disk-structure-scheduling'
  }};

  const mapped = aliasMap[clean];
  if (mapped && OS_SUMMARY_NOTES_DATA[mapped]) {{
    return OS_SUMMARY_NOTES_DATA[mapped];
  }}

  return OS_SUMMARY_NOTES_DATA['intro-to-os'];
}}
"""

with open(target_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote {target_path} covering all 30 topics!")
