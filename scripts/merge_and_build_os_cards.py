# -*- coding: utf-8 -*-
"""
Combines existing 10 topics + Part 1 + Part 2 + Part 3 into client/src/data/os/osTopicCardsData.js
Resulting in all 30 canonical topics with 10 cards each (300 cards total),
plus full alias support for backwards compatibility.
"""

import json
import os

scripts_dir = os.path.dirname(__file__)
target_js_path = os.path.abspath(os.path.join(scripts_dir, '..', 'client', 'src', 'data', 'os', 'osTopicCardsData.js'))

import os_cards_data_part1
import os_cards_data_part2
import os_cards_data_part3

with open(os.path.join(scripts_dir, 'existing_10_topics.json'), 'r', encoding='utf-8') as f:
    existing_10 = json.load(f)

# Master Canonical 30 topics
CANONICAL_CARDS = {}

# Domain 1
CANONICAL_CARDS['intro-to-os'] = os_cards_data_part1.PART1_CARDS['intro-to-os']
CANONICAL_CARDS['os-services-system-calls'] = os_cards_data_part1.PART1_CARDS['os-services-system-calls']
CANONICAL_CARDS['os-structures-architectures'] = os_cards_data_part1.PART1_CARDS['os-structures-architectures']
CANONICAL_CARDS['interrupts-traps-dual-mode'] = os_cards_data_part1.PART1_CARDS['interrupts-traps-dual-mode']

# Domain 2
CANONICAL_CARDS['processes-process-states'] = existing_10['processes']
CANONICAL_CARDS['pcb-context-switching'] = os_cards_data_part2.PART2_CARDS['pcb-context-switching']
CANONICAL_CARDS['threads-multithreading'] = existing_10['threads']
CANONICAL_CARDS['ipc'] = os_cards_data_part2.PART2_CARDS['ipc']

# Domain 3
CANONICAL_CARDS['cpu-scheduling-fundamentals'] = existing_10['cpu-scheduling']
CANONICAL_CARDS['fcfs-scheduling'] = existing_10['fcfs']
CANONICAL_CARDS['sjf-srtf-scheduling'] = existing_10['sjf-srtf']
CANONICAL_CARDS['priority-scheduling-algo'] = existing_10['priority-scheduling']
CANONICAL_CARDS['round-robin-scheduling'] = existing_10['round-robin']
CANONICAL_CARDS['mlq-mlfq-scheduling'] = os_cards_data_part2.PART2_CARDS['mlq-mlfq-scheduling']

# Domain 4
CANONICAL_CARDS['sync-critical-section'] = os_cards_data_part3.PART3_CARDS['sync-critical-section']
CANONICAL_CARDS['mutex-semaphores'] = os_cards_data_part3.PART3_CARDS['mutex-semaphores']
CANONICAL_CARDS['classical-sync-problems'] = os_cards_data_part3.PART3_CARDS['classical-sync-problems']

# Domain 5
CANONICAL_CARDS['deadlock-fundamentals'] = existing_10['deadlocks']
CANONICAL_CARDS['deadlock-prevention-avoidance'] = os_cards_data_part3.PART3_CARDS['deadlock-prevention-avoidance']
CANONICAL_CARDS['bankers-algorithm-safe-state'] = os_cards_data_part3.PART3_CARDS['bankers-algorithm-safe-state']
CANONICAL_CARDS['deadlock-detection-recovery'] = os_cards_data_part3.PART3_CARDS['deadlock-detection-recovery']

# Domain 6
CANONICAL_CARDS['main-memory-allocation'] = existing_10['memory-management']
CANONICAL_CARDS['fragmentation-allocation-strategies'] = os_cards_data_part3.PART3_CARDS['fragmentation-allocation-strategies']
CANONICAL_CARDS['paging-page-tables'] = os_cards_data_part3.PART3_CARDS['paging-page-tables']
CANONICAL_CARDS['segmentation'] = os_cards_data_part3.PART3_CARDS['segmentation']
CANONICAL_CARDS['virtual-memory-demand-paging'] = os_cards_data_part3.PART3_CARDS['virtual-memory-demand-paging']
CANONICAL_CARDS['page-replacement-algorithms'] = os_cards_data_part3.PART3_CARDS['page-replacement-algorithms']
CANONICAL_CARDS['tlb-effective-access-time'] = os_cards_data_part3.PART3_CARDS['tlb-effective-access-time']

# Domain 7
CANONICAL_CARDS['file-systems-allocation'] = existing_10['file-systems']
CANONICAL_CARDS['disk-structure-scheduling'] = os_cards_data_part3.PART3_CARDS['disk-structure-scheduling']

def normalize_card(c):
    card = dict(c)
    # Card 1
    if 'simpleWords' in card and 'inSimpleWords' not in card:
        card['inSimpleWords'] = card['simpleWords']
    if 'inSimpleWords' in card and 'simpleWords' not in card:
        card['simpleWords'] = card['inSimpleWords']
    # Card 2
    if 'problemStatement' in card and 'problem' not in card:
        card['problem'] = card['problemStatement']
    if 'problem' in card and 'problemStatement' not in card:
        card['problemStatement'] = card['problem']
    # Card 5
    if 'steps' in card and 'flowSteps' not in card:
        card['flowSteps'] = card['steps']
    if 'flowSteps' in card and 'steps' not in card:
        card['steps'] = card['flowSteps']
    # Card 7
    if 'simulationType' in card and 'vfxType' not in card:
        card['vfxType'] = card['simulationType']
    if 'vfxType' in card and 'simulationType' not in card:
        card['simulationType'] = card['vfxType']
    if 'visualDescription' in card and 'fullWorkingFlow' not in card:
        card['fullWorkingFlow'] = card['visualDescription']
    # Card 9
    if 'interviewQuestions' in card and 'questions' not in card:
        card['questions'] = card['interviewQuestions']
    if 'questions' in card and 'interviewQuestions' not in card:
        card['interviewQuestions'] = card['questions']
    return card

# Normalize all canonical cards
for tid in CANONICAL_CARDS:
    CANONICAL_CARDS[tid] = [normalize_card(c) for c in CANONICAL_CARDS[tid]]

print(f"Total Canonical Topics: {len(CANONICAL_CARDS)}")

# Add legacy and convenient aliases
FULL_MAP = dict(CANONICAL_CARDS)
FULL_MAP['processes'] = CANONICAL_CARDS['processes-process-states']
FULL_MAP['threads'] = CANONICAL_CARDS['threads-multithreading']
FULL_MAP['cpu-scheduling'] = CANONICAL_CARDS['cpu-scheduling-fundamentals']
FULL_MAP['fcfs'] = CANONICAL_CARDS['fcfs-scheduling']
FULL_MAP['sjf-srtf'] = CANONICAL_CARDS['sjf-srtf-scheduling']
FULL_MAP['priority-scheduling'] = CANONICAL_CARDS['priority-scheduling-algo']
FULL_MAP['round-robin'] = CANONICAL_CARDS['round-robin-scheduling']
FULL_MAP['deadlocks'] = CANONICAL_CARDS['deadlock-fundamentals']
FULL_MAP['bankers-algorithm'] = CANONICAL_CARDS['bankers-algorithm-safe-state']
FULL_MAP['memory-management'] = CANONICAL_CARDS['main-memory-allocation']
FULL_MAP['paging'] = CANONICAL_CARDS['paging-page-tables']
FULL_MAP['file-systems'] = CANONICAL_CARDS['file-systems-allocation']
FULL_MAP['disk-scheduling'] = CANONICAL_CARDS['disk-structure-scheduling']

# Write JS file
js_content = f"""/**
 * MASTER OPERATING SYSTEMS (OS) 10-CARD LEARNING DATA
 * 
 * Contains exactly 10 cards per topic across all 30 canonical OS syllabus topics
 * and backward-compatible aliases for legacy tests.
 * Total topics: {len(CANONICAL_CARDS)} canonical (300 cards total).
 */

export const OS_TOPIC_CARDS_MAP = {json.dumps(FULL_MAP, indent=2)};

/**
 * Accessor returning exactly 10 cards for any topic ID or alias
 */
export function getOSTopicCards(topicId) {{
  if (!topicId) return OS_TOPIC_CARDS_MAP['intro-to-os'];
  const clean = String(topicId).toLowerCase().trim().replace(/_/g, '-');
  return OS_TOPIC_CARDS_MAP[clean] || OS_TOPIC_CARDS_MAP['intro-to-os'];
}}
"""

with open(target_js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote {target_js_path} with {len(FULL_MAP)} total mapped keys!")
