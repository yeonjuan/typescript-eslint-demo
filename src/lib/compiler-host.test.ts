import rewire from "rewire"
const compiler_host = rewire("@/lib/compiler-host")
const CompilerHost = compiler_host.__get__("CompilerHost")

// @ponicode
describe("fileExists", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({}, { key0: undefined, key1: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.fileExists("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.fileExists("/dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.fileExists("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.fileExists("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.fileExists("DUMMYNAME")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.fileExists("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getCurrentDirectory", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({}, { key0: undefined, key1: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getCurrentDirectory()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getDirectories", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({ key0: "Hello, world!" }, { key0: undefined, key1: undefined, key2: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getDirectories()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getDefaultLibFileName", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({ key0: "Hello, world!", key1: "Hello, world!", key2: "Hello, world!", key3: "Hello, world!" }, {})
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getDefaultLibFileName(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getNewLine", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({ key0: "This is a Text" }, { key0: undefined, key1: undefined, key2: undefined, key3: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getNewLine()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("useCaseSensitiveFileNames", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({ key0: "foo bar", key1: "Hello, world!", key2: "Foo bar", key3: "Foo bar", key4: "This is a Text" }, {})
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.useCaseSensitiveFileNames()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("writeFile", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({ key0: "Hello, world!", key1: "This is a Text", key2: "Hello, world!", key3: "Hello, world!" }, { key0: undefined, key1: undefined, key2: undefined, key3: undefined, key4: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.writeFile()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("readFile", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({ key0: "foo bar", key1: "This is a Text", key2: "This is a Text" }, { key0: undefined, key1: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.readFile("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.readFile("dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.readFile("DUMMYNAME")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.readFile("/dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.readFile("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.readFile("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSourceFile", () => {
    let inst: any

    beforeEach(() => {
        inst = new CompilerHost({}, { key0: undefined, key1: undefined, key2: undefined, key3: undefined, key4: undefined })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getSourceFile("/dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.getSourceFile("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.getSourceFile("dummyname")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.getSourceFile("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.getSourceFile("DUMMYNAME")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.getSourceFile("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("compiler_host.createCompilerHost", () => {
    test("0", () => {
        let callFunction: any = () => {
            compiler_host.createCompilerHost({}, {})
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            compiler_host.createCompilerHost({}, { key0: undefined, key1: undefined, key2: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            compiler_host.createCompilerHost({ key0: "foo bar" }, { key0: undefined, key1: undefined, key2: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            compiler_host.createCompilerHost({ key0: "Foo bar" }, { key0: undefined, key1: undefined, key2: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            compiler_host.createCompilerHost({ key0: "foo bar", key1: "This is a Text" }, { key0: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            compiler_host.createCompilerHost({ key0: "", key1: "", key2: "", key3: "", key4: "" }, { key0: undefined, key1: undefined, key2: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
