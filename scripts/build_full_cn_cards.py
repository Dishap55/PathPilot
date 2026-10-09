import sys
import json
import os

sys.path.append('scripts')
from cn_cards_data_part1 import part1_topics
from cn_cards_data_part2 import part2_topics
from cn_cards_data_part3 import part3_topics

all_topics = {}
all_topics.update(part1_topics)
all_topics.update(part2_topics)
all_topics.update(part3_topics)

formatted_cards = {}

for topic_id, data in all_topics.items():
    vfx_type = data.get("vfx", "packet-travel")
    cards = [
        # Card 1: What is it?
        {
            "cardNumber": 1,
            "badge": "Concept",
            "title": f"What is {data['title'].split('(')[0].strip()}?",
            "inSimpleWords": data["def"],
            "analogy": data["analogy"],
            "diagramType": "osi-model" if "osi" in topic_id else ("tcp-header" if "tcp" in topic_id else None)
        },
        # Card 2: Why do we need it?
        {
            "cardNumber": 2,
            "badge": "Motivation",
            "title": f"Why do we need {data['title'].split('(')[0].strip()}?",
            "problem": data["problem"],
            "whyItMatters": data["whyItMatters"],
            "howSolves": data["howSolves"]
        },
        # Card 3: How does it work?
        {
            "cardNumber": 3,
            "badge": "Mechanics",
            "title": f"How does {data['title'].split('(')[0].strip()} work?",
            "steps": data["steps"],
            "vfxType": vfx_type
        },
        # Card 4: Internal Structure & Packet Format
        {
            "cardNumber": 4,
            "badge": "Architecture",
            "title": f"Internal Structure & Formats",
            "structureDetails": data["structure"],
            "diagramType": "tcp-header" if "tcp" in topic_id else ("ipv4-header" if "ip" in topic_id else ("ethernet-frame" if "frame" in topic_id or "mac" in topic_id else None))
        },
        # Card 5: Step-by-Step Packet Flow
        {
            "cardNumber": 5,
            "badge": "Process Flow",
            "title": f"Step-by-Step Flow",
            "scenario": data["scenario"],
            "challenge": data["challenge"],
            "resolution": data["resolution"],
            "vfxType": vfx_type
        },
        # Card 6: Real-World Technical Example
        {
            "cardNumber": 6,
            "badge": "Example",
            "title": f"Real-World Technical Example",
            "exampleValues": data["examples"]
        },
        # Card 7: Complete Working Flow / VFX
        {
            "cardNumber": 7,
            "badge": "Execution",
            "title": f"Interactive Live Flow Simulation",
            "fullWorkingFlow": f"Complete end-to-end packet transmission for {data['title']}. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
            "vfxType": vfx_type
        },
        # Card 8: Common Mistakes & Traps
        {
            "cardNumber": 8,
            "badge": "Traps",
            "title": f"Common Mistakes & Interview Traps",
            "traps": data["traps"]
        },
        # Card 9: Interview & Placement Angle
        {
            "cardNumber": 9,
            "badge": "Interview",
            "title": f"Interview & Placement Question",
            "questions": [
                {
                    "q": data["interview"]["q"],
                    "a": data["interview"]["a"],
                    "tip": data["interview"]["tip"]
                }
            ]
        },
        # Card 10: Quick Revision & Cheat Sheet
        {
            "cardNumber": 10,
            "badge": "Summary",
            "title": f"Quick Revision & Cheat Sheet",
            "cheatSheet": data["cheat"]
        }
    ]
    formatted_cards[topic_id] = cards

output_path = os.path.join('client', 'src', 'data', 'cn', 'cnTopicCardsData.js')

with open(output_path, 'w', encoding='utf-8') as f:
    f.write('/**\n')
    f.write(' * MASTER COMPUTER NETWORKS (CN) 10-CARD THEORY REPOSITORY\n')
    f.write(' * Exact 10 cards per topic across all 48 canonical topics (480 total cards)\n')
    f.write(' */\n\n')
    f.write('export const CN_TOPIC_CARDS = ')
    json.dump(formatted_cards, f, indent=2, ensure_ascii=False)
    f.write(';\n\n')
    f.write('''/**
 * Returns the exact 10 theory cards for a given canonical topicId.
 * Falls back to 'osi-model' if topicId is unset or invalid.
 */
export function getCNTopicCards(rawTopicId) {
  if (!rawTopicId) return CN_TOPIC_CARDS['osi-model'];
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  return CN_TOPIC_CARDS[clean] || CN_TOPIC_CARDS['osi-model'];
}
''')

print(f"Successfully generated {len(formatted_cards)} topics with 10 cards each in {output_path}!")
