<template>
  <div>
    <a-card>
      <a-form>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="发布时间"
              style="margin-bottom:10px"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 18}"
            >
              <a-range-picker
                @change="onChange"
                v-model="form.timeDate"
                :defaultValue="[moment(), moment()]"
              ></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="情感"
              style="margin-bottom:10px"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 18}"
            >
              <a-select v-model="form.emotion">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="up">正面</a-select-option>
                <a-select-option value="down">全部</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="排序"
              style="margin-bottom:10px"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 18}"
            >
              <a-select v-model="form.rank">
                <a-select-option value="down">时间降序</a-select-option>
                <a-select-option value="up">时间升序</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="媒体属性"
              style="margin-bottom:10px"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 18}"
            >
              <a-select v-model="form.rank">
                <a-select-option value="down">全部</a-select-option>
                <a-select-option value="up">新闻层面</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="处理"
              style="margin-bottom:10px"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 18}"
            >
              <a-select v-model="form.rank">
                <a-select-option value="down">时间降序</a-select-option>
                <a-select-option value="up">时间升序</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="网络类别"
              style="margin-bottom:10px"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 18}"
            >
              <a-select v-model="form.rank">
                <a-select-option value="down">时间降序</a-select-option>
                <a-select-option value="up">时间升序</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card>
        <a-table
        ref="table"
        rowKey="id"
        size="middle"
        :rowSelection="rowSelection"
        :columns="columns"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">
            <a-icon type="edit" />编辑
          </a>
          <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record.id)">
            <a style="margin-left:10px">
              <a-icon type="delete" />删除
            </a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import { getList } from '@/api/newpage'
import moment from 'moment'
export default {
  data() {
    return {
      form: {
        timeDate: [],
        emotion: 'all',
        rank: 'down'
      }
    }
  },
  mounted() {
    getList().then(res => {
      console.log(res)
    })
  },
  methods: {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    moment
  }
}
</script>
