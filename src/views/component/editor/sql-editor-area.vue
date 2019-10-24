<!--sql编辑器组件-->
<template>
  <div class="SqlEditorArea">
    <textarea ref="textarea" :placeholder="placeholder" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/display/placeholder';// 占位内容
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js'; // sql提示
import 'codemirror/addon/hint/sql-hint'; // sql提示

// sql-formatter插件是不是需要? mj
// import 'codemirror/mode/javascript/javascript';
export default {
  name: 'sql-editor-area',
  props: {
    sqlSentence: { // 父组件传递过来的sql查询语句
      type: String,
      default: '',
      // 'select a.title,a.username,b.adddate from table a,(select max(adddate) adddate from table where table.title=a.title) b'
    },
    placeholder: {// 由于每个编辑器的占位内容不一样
      type: String,
      default: '请输入内容...'
    },
    // 数据集筛选-父组件传值
    sqlAdd: String
  },
  data () {
    return {
      childValue: ''
    };
  },
  // 数据集筛选-监听父组件传值的变化
  watch: {
    sqlAdd (val) {
      this.appSqlParams(val);
    }
  },
  mounted () {
    this._initEditor();
    // console.log(this._getValue());
  },
  methods: {
    appSqlParams (val) {
      // let sqlString = this.sqlEditorArea.getValue();
      // this.sqlEditorArea.setValue(sqlString + val);
      // 数据集筛选-光标后追加值
      this.sqlEditorArea.replaceSelection(val);
    },
    _initEditor () {
      // 编辑器初始化配置
      this.sqlEditorArea = CodeMirror.fromTextArea(this.$refs.textarea, {
        lint: true, // 是否开启代码检查 true|false
        mode: 'text/x-sql',
        lineNumbers: false, // 是否显示行号 true|false
        theme: 'eclipse', // 编辑器主题，需要引入相应的css文件
        keyMap: 'sublime',
        extraKeys: { Ctrl: 'autocomplete' },
        hint: CodeMirror.hint.sql, // 启用sql提示
        lineWrapping: true, // 是否换行
        foldGutter: true, // 是否折叠
        gutters: [
          // 添加lint标记，行号栏，折叠栏
          'CodeMirror-lint-markers',
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter'
        ]
      });

      // 将父组件传递过来的查询语句设置到输入框中
      this.sqlEditorArea.setValue(this.sqlSentence);

      // 给输入框绑定change事件
      this.sqlEditorArea.on('change', cm => {
        let newSqlSentence = cm.getValue().trim();
        this.$emit('update:sqlSentence', newSqlSentence);
        this.$emit('changed', newSqlSentence);
        this.$emit('childByValue', newSqlSentence);
      });
    },

    /**
     * 获取输入框内的文本
     * @returns {*|string}
     */
    _getValue () {
      return this.sqlEditorArea.getValue();
    }
  }
};
</script>

<style lang="scss" scoped>
.SqlEditorArea {
  /deep/ .CodeMirror {
    font-size: 1rem;
    font-family: Menlo, Monaco, Consolas, "Andale Mono", "lucida console",
      "Courier New", monospace;
    .CodeMirror-placeholder {
      color: #aaa;
    }
  }
}
</style>
