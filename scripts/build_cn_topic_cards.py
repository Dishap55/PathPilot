import sys
import json
import os

target_path = os.path.join('client', 'src', 'data', 'cn', 'cnTopicCardsData.js')

# Read topic registry to get all 48 topic IDs
sys.path.append('scripts')

print("Generating 10-card curriculum for all 48 Computer Networks topics...")
