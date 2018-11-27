<template>
  <div class="password">
    <h1>1Password</h1>
    <div id="j-copy" :data-clipboard-text="passwordContent" class="passwd-content">
      {{passwordContent}}
    </div>
    <div class="passwd-panel">
      <div class="passwd-panel-item">
        <!-- 48-57 -->
        <span class="title">数字（0-9）</span>
        <el-switch
          @change="createPasswordBase"
          v-model="number"
          active-text="ON"
          inactive-text="OFF">
        </el-switch>
      </div>
      <div class="passwd-panel-item">
        <!-- 65-90 -->
        <span class="title">大写字母（A-Z）</span>
        <el-switch
          @change="createPasswordBase"
          v-model="uppercaseLetter"
          active-text="ON"
          inactive-text="OFF">
        </el-switch>
      </div>
      <div class="passwd-panel-item">
        <!-- 97-122 -->
        <span class="title">小写字母（a-z）</span>
        <el-switch
          @change="createPasswordBase"
          v-model="lowerLetters"
          active-text="ON"
          inactive-text="OFF">
        </el-switch>
      </div>
      <div class="passwd-panel-item">
        <!-- 35,36,37,38,42,,63,64 -->
        <span class="title">特殊字符（!@#$%&*?_）</span>
        <el-switch
          @change="createPasswordBase"
          v-model="character"
          active-text="ON"
          inactive-text="OFF">
        </el-switch>
      </div>
      <div class="passwd-panel-item">
        <span class="title">字符重复</span>
        <el-switch
          v-model="repeat"
          active-text="ON"
          inactive-text="OFF">
        </el-switch>
      </div>
      <div class="passwd-panel-item">
        <span class="title">排除字符</span>
        <el-input
          @blur="createPasswordBase"
          v-model="exclude"
          placeholder="排除字符"
          size="small"
        ></el-input>
      </div>
      <div class="passwd-panel-item">
        <span class="title">密码长度</span>
        <el-input-number size="small" v-model="passwordLen" :min="6" :max="512" label="密码长度"></el-input-number>
      </div>
      <el-button @click="generatePassword" class="passwd-panel--btn" type="primary">生成密码</el-button>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

let passwordBase = []
let characterBase = ['!', '@', '#', '$', '%', '&', '*', '?', '_']
export default {
  name: 'Password',
  data () {
    return {
      number: true,
      uppercaseLetter: true,
      lowerLetters: true,
      character: true,
      repeat: true,
      exclude: '',
      passwordLen: 16,
      passwordContent: '等待生成'
    }
  },
  created () {
    this.createPasswordBase()
  },
  mounted () {
    this.copyPassword()
  },
  methods: {
    copyPassword () {
      // 复制密码
      let clipboard = new ClipboardJS('#j-copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '密码复制成功',
          type: 'success'
        })
        e.clearSelection()
      })
      clipboard.on('error', () => {
        this.$message.error('密码复制失败，请手动复制。')
      })
    },
    generatePassword () {
      // 生成密码
      let maxLen = passwordBase.length - 1
      let password = ''

      if (maxLen <= 0) {
        return this.$message.error('你必须选择至少一个字符类型')
      }

      if (!this.repeat && maxLen < this.passwordLen) {
        return this.$message.error('所有字符不足以生成密码，请开启字符重复')
      }

      for (let i = 0; i < this.passwordLen; i++) {
        let index = this.randomNumBoth(0, maxLen)
        password += passwordBase[index]
        if (!this.repeat) {
          passwordBase.splice(index, 1)
          maxLen--
        }
      }

      this.passwordContent = password
      if (!this.repeat) {
        this.createPasswordBase()
      }
    },

    randomNumBoth (Min, Max) {
      // 生成范围内随机数
      let Range = Max - Min
      let Rand = Math.random()
      return Min + Math.round(Rand * Range)
    },

    createPasswordBase () {
      // 创建密码基础
      passwordBase = []
      for (let i = 33; i < 126; i++) {
        // 数字
        if (this.number && i >= 48 && i <= 57) {
          passwordBase.push(String.fromCharCode(i))
        }

        // 大写字母
        if (this.uppercaseLetter && i >= 65 && i <= 90) {
          passwordBase.push(String.fromCharCode(i))
        }

        // 小写字母
        if (this.lowerLetters && i >= 97 && i <= 122) {
          passwordBase.push(String.fromCharCode(i))
        }
      }

      if (this.character) {
        passwordBase = passwordBase.concat(characterBase)
      }

      // 排除
      if (this.exclude && passwordBase.length > 0) {
        let re = this.exclude.split('').join('|')
        re = new RegExp(re, 'g')
        passwordBase = passwordBase.join('')
        passwordBase = passwordBase.replace(re, '').split('')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .password {
    padding: 0 10px;
    margin: 0 auto;
    max-width: 640px;
    h1 {
      color: #333;
      text-align: center;
    }
    .passwd-panel-item {
      padding: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #8492a6;
      border-bottom: 1px solid #e8e8e8;

      .el-input-number,
      .el-input {
        width: 110px;
      }
    }

    .passwd-content {
      margin: 16px 0;
      padding: 10px;
      border-radius: 6px;
      color: #67c23a;
      background-color: #f0f9eb;
      border: 1px solid #c2e7b0;
      cursor: pointer;
      word-wrap: break-word;
    }

    .passwd-panel--btn {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
