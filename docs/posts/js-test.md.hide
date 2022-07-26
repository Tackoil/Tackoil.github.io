---
title: Hexo 中内嵌JS/CSS的测试
date: 2021-08-21 22:57:35
hide: true
tags:
---

<script src="https://unpkg.com/vue@next"></script>

<div id="event-handling" class="demo">
  <p>TEST: {% raw %}
{{ message }}
{% endraw %}</p>
  <button @click="reverseMessage">Reverse Message</button>
</div>
<script>
    const EventHandlingApp = {
    data() {
        return {
            message: 'Hello Vue.js!'
        }
    },
    methods: {
        reverseMessage() {
            console.log("did")
            this.message = this.message
                .split('')
                .reverse()
                .join('')
            }
        }
    }
    Vue.createApp(EventHandlingApp).mount('#event-handling')
</script>
<style>
    .demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
</style>