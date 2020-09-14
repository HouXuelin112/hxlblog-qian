//校验输入是否需要发请求
export function validateInput(event) {
		var currentInput = event.data;
		// 如果输入为空值（包括空格）返回false
		// insertCompositionText是输入法为中文输入模式
		if (event.inputType == 'insertCompositionText') {
			// 如果输入的是汉字或者希腊字母，则返回true
			if (currentInput && currentInput.match(/[\u4e00-\u9fa5]+|[\u0370-\u03ff]+/)) {
				return true;
			}
			return false;
		}
		// insertText是输入法为英文输入模式
		if (event.inputType == 'insertText') {
			// 如果输入的是逗号或者空格等分词符号，说明用户不是在输入要校验的字符，不用发请求，返回false
			if (currentInput && !currentInput.match(/,+|，+|\s+/)) return true;
			return false;
		}
		// insertFromPaste是粘贴，如果是粘贴，则放行
		if (event.inputType == 'insertFromPaste') {
			return true;
		}
		// deleteContentBackward是按回退键删除
		// deleteContentForward是按Del键删除
		if (['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) != -1) {
			// 如果删除的是最后一个字符(即删除完文本输入框为空)，则不发请求，返回false
			if (event.currentTarget.innerText()) return true;
			return false;
		}
		// 其他情况暂不考虑
		return false;
  }