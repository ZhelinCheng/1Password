<template>
  <div class="password">
    <h1>1Password</h1>
    <div class="passwd-panel">
      <div class="passwd-panel-item">
        <span class="title">数字（0-9）</span>
        <el-switch
          v-model="value3"
          active-text="ON"
          inactive-text="OFF">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  data () {
    return {
      value3: true
    }
  }
}
</script>

<style lang="less" scoped>
  .password {
    padding: 0 10px;
    margin: 0 auto;
    max-width: 750px;

    h1 {
      color: #333;
      text-align: center;
    }
    .passwd-panel-item {
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #606266;
      border-bottom: 1px solid #606266;
    }
  }
</style>
