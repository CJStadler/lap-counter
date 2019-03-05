SRC_FILES := $(shell find src/ -name '*.jsx')
BUILD_JS := dist/bundle.js

$(BUILD_JS): $(SRC_FILES)
	npx webpack -d

.PHONY: clean optimize

optimized: $(SRC_FILES)
	npx webpack --mode "production"

clean:
	rm $(BUILD_JS)
