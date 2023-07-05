<template>
  <div class="arrow">
    <div class="menu-bar">Menubar widget here</div>
  </div>
</template>

<style scoped>


.menu-bar {
  background: var(--bg-color);
  flex: 1;
  border-radius: 4px;
  padding: .5em;
  color: var(--color);
  border: 1px solid var(--bg-border-color);
}
.arrow {
  position: relative;
  padding: 12px 0 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 12px);
}

.arrow:before {
  content: '';
  height: 0;
  width: 0;
  border-width: 0 8px 12px 8px;
  border-style: solid;
  border-color: transparent transparent var(--bg-border-color) transparent;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
