import sys
import json
import os

sys.path.append('scripts')
from mcqs_part1 import part1_mcqs
from mcqs_part2 import part2_mcqs
from mcqs_part3 import part3_mcqs
from mcqs_part4 import part4_mcqs

all_mcqs = part1_mcqs + part2_mcqs + part3_mcqs + part4_mcqs

target_path = os.path.join('client', 'src', 'data', 'dbms', 'dbmsMcqBankData.js')

with open(target_path, 'w', encoding='utf-8') as f:
    f.write('/**\n')
    f.write(' * Comprehensive Master DBMS MCQ Question Bank\n')
    f.write(' * 196 Topic-Mapped Questions across all 12 Canonical DBMS Topics\n')
    f.write(' * Contains Progressive Hints, Explanations, Option Breakdowns, and Placement/Company Metadata\n')
    f.write(' */\n\n')
    f.write('export const DBMS_MCQ_QUESTIONS = ')
    json.dump(all_mcqs, f, indent=2, ensure_ascii=False)
    f.write(';\n')

print(f'Successfully wrote {len(all_mcqs)} MCQs to {target_path}')
