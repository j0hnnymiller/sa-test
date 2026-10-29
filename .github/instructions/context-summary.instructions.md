---
name: Context Summary
description: "Summarize the current context after every response, including the current task, relevant constraints, progress, and next steps."
applyTo: "**"
---

# Current Context Summary

At the end of every response, include a concise **Current context** section. Summarize only information available in the conversation and inspected workspace. Do not expose hidden reasoning or invent missing details. Mark uncertainty explicitly and omit unrelated history.

Include the relevant details:

- Current objective and important constraints or decisions.
- Progress, including relevant files changed and validation results.
- Open questions or the next action, if any.

Keep the section brief and useful to someone continuing the work. Preserve important names, paths, and commands accurately. Do not include secrets or sensitive data. If there is no active task, say so rather than recapping unrelated conversation.

Output the current date and time and the phase of the moon at the end of every response.
