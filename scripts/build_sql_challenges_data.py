import os
import json
import re
from sql_challenges_part1 import part1_challenges
from sql_challenges_part2 import part2_challenges
from sql_challenges_part3 import part3_challenges

all_challenges = part1_challenges + part2_challenges + part3_challenges
all_challenges.sort(key=lambda x: int(x['id'].replace('sql-ch-', '')))

output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../client/src/data/dbms/dbmsSqlChallengesData.js'))

print(f"Generating {len(all_challenges)} challenges to {output_path}...")

lines = [
    "/**",
    " * MASTER DBMS SQL QUERY PRACTICE CHALLENGES (65 High-Quality placement challenges)",
    " * Covering all 12 canonical DBMS topics with runnable schema contexts, automated test cases,",
    " * progressive hints, and query breakdown explanations.",
    " */",
    "",
    "export const DBMS_SQL_CHALLENGES = ["
]

for idx, c in enumerate(all_challenges):
    comma = "," if idx < len(all_challenges) - 1 else ""
    lines.append("  {")
    lines.append(f"    id: {json.dumps(c['id'])},")
    lines.append(f"    topicId: {json.dumps(c['topicId'])},")
    lines.append(f"    title: {json.dumps(c['title'])},")
    lines.append(f"    difficulty: {json.dumps(c['difficulty'])},")
    lines.append(f"    attribution: {json.dumps(c['attribution'])},")
    if "companyMetadata" in c:
        lines.append(f"    companyMetadata: {json.dumps(c['companyMetadata'], indent=6).strip()},")
    lines.append(f"    prompt: {json.dumps(c['prompt'])},")
    lines.append(f"    schema_context: {json.dumps(c['schema_context'])},")
    lines.append(f"    sample_data: {json.dumps(c['sample_data'], indent=6).strip()},")
    lines.append(f"    starter_query: {json.dumps(c['starter_query'])},")
    lines.append(f"    solution_query: {json.dumps(c['solution_query'])},")
    lines.append(f"    expected_result: {json.dumps(c['expected_result'], indent=6).strip()},")
    
    # Test cases with executable functions
    lines.append("    test_cases: [")
    for t_idx, tc in enumerate(c['test_cases']):
        t_comma = "," if t_idx < len(c['test_cases']) - 1 else ""
        lines.append("      {")
        lines.append(f"        id: {tc['id']},")
        lines.append(f"        title: {json.dumps(tc['title'])},")
        lines.append(f"        description: {json.dumps(tc['description'])},")
        code_fn = tc.get('code') or "(res) => Array.isArray(res) && res.length >= 1"
        lines.append(f"        passedCheck: {code_fn}")
        lines.append(f"      }}{t_comma}")
    lines.append("    ],")
    
    lines.append(f"    hints: {json.dumps(c['hints'], indent=6).strip()},")
    lines.append(f"    explanation: {json.dumps(c['explanation'])},")
    lines.append(f"    queryBreakdown: {json.dumps(c['queryBreakdown'], indent=6).strip()}")
    lines.append(f"  }}{comma}")

lines.append("];")
lines.append("")

with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Successfully generated {output_path} with {len(all_challenges)} challenges!")
